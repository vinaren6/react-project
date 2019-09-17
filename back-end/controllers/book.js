

const addBook = (req, res) => {
    res.status(200).json({ data: 'adding books.....' })
}

module.exports = { addBook: addBook}