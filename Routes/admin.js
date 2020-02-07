const router = require("express").Router();
const path = require("path");
const dirname = require("../Utils/Path");

router.use("/AddProduct", (request, response, next) => {
  response.sendFile(path.join(dirname,'Views','AddProduct.html'));
});

module.exports = router;

//Redundant code:

