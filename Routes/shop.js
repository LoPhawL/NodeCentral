const app = require("../app");
const router = require("express").Router();

//Home page with list of products
router.use("/Home", (request, response, next) => {
  const books = app.get('books');
  response.render('Home',{books:books, page:'Home'})
});

module.exports = router;
