const { updateOne } = require('../Models/book');
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
  },
  new: (req, res) => {
    res.render("form");
  },
  admin: (req, res) => {
    book.find({})
      .then(books => {
        res.render("admin", {
          books: books
        })
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        res.redirect("/");
      });
  },
  delete: (req, res, next) => {
    let bookId = req.params.id;
    book.findByIdAndRemove(bookId)
      .then(() => {
        res.locals.redirect = "/admin";
        next();
      })
      .catch(error => {

        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  create: (req, res, next) => {
    let bookParams = {
      id: req.body.id,
      Name: req.body.Name,
      AuthorName: req.body.AuthorName,
      Description: req.body.Description
    };
    book.create(bookParams)
      .then(books => {
        res.locals.redirect = "/admin";
        res.locals.books = books;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  }
}