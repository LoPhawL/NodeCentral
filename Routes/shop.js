const app = require("../app");
const router = require("express").Router();

router.post("/Product", (request, response, next) => {
  //   console.log(app.get("books"));
  const data = request.body;
  app.get("books").push( { Name:data.bName, Cost:data.bCost } );
  response.redirect("/Home");
});

module.exports = router;
