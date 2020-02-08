const router = require("express").Router();
const path = require("path");
const dirname = require("../Utils/Path");

router.use("/AddProduct", (request, response, next) => {
  response.render('AddProduct', {page:'AddProduct'});
});

module.exports = router;

//Redundant code:

