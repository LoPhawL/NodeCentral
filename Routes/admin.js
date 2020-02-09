const router = require("express").Router();
const app = require("../app");

router.use("/AddProduct", (request, response, next) => {
  response.render('AddProduct', {page:'AddBook'});
});

router.post("/Product", (request, response, next) => {
  const data = request.body;
  app.get("books").push( { Name:data.pName, Cost:data.pCost } );
  response.redirect("/Home");
});

module.exports = router;
