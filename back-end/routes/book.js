var express = require('express')
var router = express.Router()
const controllers = require('../controllers/book')

router
  .route('/')
  .get(controllers.addBook)
  .post(controllers.addBook)

router
  .route('/:id')
  .get(controllers.addBook)
  .put(controllers.addBook)
  .delete(controllers.addBook)

  module.exports = router