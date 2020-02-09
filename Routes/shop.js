const router = require("express").Router();
const shopController = require('../Controllers/ShopController');

//Home page with list of products
router.use("/Home", (request, response, next) => {shopController.get_HomePage(response);});

module.exports = router;
