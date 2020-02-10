const express = require("express");
const bodyParser = require("body-parser");
const Book = require('./Models/Books')

const app = express();
Book.GetAllBooks( data =>
  {
    // console.log(data);
    app.set('books',data);
  });
app.set("view engine", "ejs");
// app.set("views", "./Views");
module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./Public"));

//Adding routes in external modules
app.use("/Admin", require("./Routes/admin"));
app.use(require("./Routes/shop"));

//404 page and / (redirected to Home)
app.use((request, response, next) => {
  if (request.originalUrl != "/")  //wrong route
  {
    response.status(404).render('404',{page:'404'})
  }
  else //empty route
  { 
    response.setHeader("Auth", "//");
    response.redirect("/Home");
  }
});

app.listen(3000);
