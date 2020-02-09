const router = require("express").Router();
const adminController = require('../Controllers/AdminController');

router.use("/AddProduct", (request, response, next) => {
  adminController.get_AddProductsPage(response);
});

router.post("/Product", (request, response, next) => {
  adminController.add_Books(request,response)
});

module.exports = router;
