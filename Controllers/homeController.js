var book = require('../Models/book');


module.exports = {
    home: (req, res) => {
        book.find({})
        .then(books => {
            res.render("books", {
                books: books
            })  
        })
    },
    show: (req, res, next) => {
    let bookId = req.params.id;
    book.findById(bookId)
      .then(books => {
        res.locals.books = books;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("Book1");
  },
  getIndex: (req, res) => {
    res.render("index");
  }
}