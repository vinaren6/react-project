const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');

function createJWT(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_DEV_ENV_SECRET, {
        expiresIn: process.env.JWT_DEV_ENV_EXP
    })
}

const verifyJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_DEV_ENV_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
})

const signup = (req, res) => {

    const user = new User()

    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.password = req.body.password


    user.save(function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).end()
        } else {
            const signedJWT = createJWT(user)
            return res.status(201).send({ signedJWT })
        }
    })
}

const login = async (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password)


    const user = await User.findOne({ email: req.body.email }).exec()
    if (!user) {
        return res.status(400).send({ message: 'invalid combination' })
    }
    const matchingPasswords = await user.checkPassword(req.body.password)
    if (!matchingPasswords) {
        return res.status(400).send({ message: 'invalid combination' })
    }
    console.log("login succesful")
    const signedJWT = createJWT(user)
    return res.status(201).send({ signedJWT })
}

const isAuthorized = async (req, res, next) => {

    const bearer = req.headers.authorization
    
    const token = bearer.split('Bearer ')[1].trim()
    let payload

    try {
        payload = await verifyJWT(token)
    } catch (e) {
        return res.status(500).end()
    }

    const user = await User.findById(payload.id).exec()

    if (!user) {
        return res.status(500).end()
    }
     console.log("authorized")
    req.user = user
    next()
}

module.exports = {
    signup: signup,
    login: login,
    isAuthorized: isAuthorized
}