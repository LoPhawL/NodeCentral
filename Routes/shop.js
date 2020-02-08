const app = require("../app");
const router = require("express").Router();

router.post("/Product", (request, response, next) => {
  const data = request.body;
  app.get("books").push( { Name:data.pName, Cost:data.pCost } );
  response.redirect("/Home");
});

module.exports = router;
