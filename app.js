const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", "./Views");
app.set("books", []);
module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./Public"));

//Home page with list of products
app.use("/Home", (request, response, next) => {
 response.sendFile(path.join(__dirname, "./", "Views", "Home.html"));
});

//Adding routes in external modules
app.use("/admin", require("./Routes/admin"));
app.use(require("./Routes/shop"));

//404 page and / (redirected to Home)
app.use((request, response, next) => {
  if (request.originalUrl != "/")  //wrong route
  {
    response.status(404).sendFile(path.join(__dirname, "Views", "404.html"));
  }
  else //empty route
  { 
    response.setHeader("Auth", "//");
    response.redirect("/Home");
  }
});

app.listen(3000);
