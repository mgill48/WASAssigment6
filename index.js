var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var app = express();
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var book = require('./Models/book')
var bookController = require('./Controllers/homeController');
var methodOverride = require("method-override");
var homeController = require('./Controllers/homeController');
require("dotenv").config();

app.set("view engine", "ejs")
app.set("port", process.env.PORT)
app.use(expressLayouts)
app.set("layout", "layout")
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json())
app.use(express.static(__dirname))
var uri = process.env.ATLAS_URI;
//console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true})

var db = mongoose.connection     

db.once("open", () => {
    console.log("MongoDB successfully connected")
});
app.use(
    methodOverride("_method", {
      methods: ["POST", "GET", "PATCH"]
    })
  );
  
app.get("/", bookController.getIndex)
app.get("/home", bookController.getIndex)
app.get("/booksList", bookController.home)
app.get("/books/:id", homeController.show, homeController.showView)
app.get("/addnewbook", homeController.new)
app.get("/admin", bookController.admin)
app.delete("/books/:id/delete", bookController.delete, bookController.redirectView);
app.post("/books/create", bookController.create, bookController.redirectView);
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });