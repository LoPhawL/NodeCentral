const router = require('express').Router();

const controllers = 
{
    cart:require('../Controllers/CartController'),
    orders:require('../Controllers/OrdersController'),
    products:require('../Controllers/ProductsController')
};

router.use('/Products',(req,res,next)=>
{
    controllers.products.renderPage(res);
});

router.use('/Cart',(req,res,next)=>
{
    controllers.cart.renderPage(res);
});

router.use('/Orders',(req,res,next)=>
{
    controllers.orders.renderPage(res);
});

router.use((request, response, next) => {
    if (request.originalUrl != "/User" && request.originalUrl != "/User/")  //wrong route
    {
      response.status(404).render('404',{module:'enduser',page:'404'});
    }
    else //empty route
    { 
      response.redirect("/User/Products");
    }
  });

module.exports = router;