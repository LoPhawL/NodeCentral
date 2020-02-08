const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.engine('handlebars',require('express-handlebars')())
app.set("view engine", "handlebars");
app.set("views", "./Views");
app.set("books", []);
module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./Public"));

//Home page with list of products
app.use("/Home", (request, response, next) => {
  const books = app.get("books");
  response.render("Home", { books: books, page: "Home", hasBooks: books.length > 0});
});

//Adding routes in external modules
app.use("/admin", require("./Routes/admin"));
app.use(require("./Routes/shop"));

//404 page and / (redirected to Home)
app.use((request, response, next) => {
  if (request.originalUrl != "/")  //wrong route
  {
    response.status(404).render("404", { page: "404" });
  }
  else //empty route
  { 
    response.redirect("/Home");
  }
});

app.listen(3000);

//Redundant code:
// response.sendFile(path.join(__dirname, "./", "Views", "Home.html"));
// response.status(404).sendFile(path.join(dirname, "Views", "404.html"));
