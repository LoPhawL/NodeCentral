const router = require('express').Router();

const controllers = 
{
    cart:require('../Controllers/CartController'),
    orders:require('../Controllers/OrdersController'),
    products:require('../Controllers/ProductsController'),
    productDetails:require('../Controllers/ProductDetails')
};

router.use('/Products/:productId',(req,res,next)=>
{
  controllers.productDetails.renderPage(req.param('productId'),res);
});

router.use('/Products',(req,res,next)=>
{
    controllers.products.renderPage(res);
});

router.use('/Cart/Clear',(req,res,next)=>
{
  controllers.cart.clear(()=>res.redirect('/User/Cart'));
});

router.use('/Cart/:productId/:action',(req,res,next)=>
{
  controllers.cart.modifyCart(req.params['productId'],req.params['action'], ()=>res.redirect('/User/Cart'));
});

router.use('/Cart',(req,res,next)=>
{
    controllers.cart.renderPage(res);
});

router.use('/CheckOut',(req,res,next)=>
{
    controllers.cart.checkOut(()=>{res.redirect('/User/Orders');});
});

router.use('/Orders',(req,res,next)=>
{
    controllers.orders.renderPage(res);
});

router.use('/AddToCart',(req,res,next)=>
{
    controllers.cart.addToCart(req.body.productID, res);
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