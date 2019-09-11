//exercise - create more controllers
//create a model representing a book..

const addBook = (req, res) => {
    res.status(200).json({ data: 'adding books.....' })
}

module.exports = { addBook: addBook}