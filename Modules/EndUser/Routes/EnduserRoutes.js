const router = require('express').Router();
const UserAuthGuard = require('../../../RouteGuards/UserAuthGuard');

const controllers = 
{
    cart:require('../Controllers/CartController'),
    orders:require('../Controllers/OrdersController'),
    products:require('../Controllers/ProductsController'),
    productDetails:require('../Controllers/ProductDetails')
};

router.use('/Products/:productId',(req,res,next)=>
{
  controllers.productDetails.renderPage(req,res);
});

router.use('/Products',(req,res,next)=>
{
    controllers.products.renderPage(req,res);
});

router.use('/Cart/Clear',UserAuthGuard,(req,res,next)=>
{
  controllers.cart.clear(req.session.userId,()=>res.redirect('/User/Cart'));
});

router.use('/Cart/:productId/:action',UserAuthGuard,(req,res,next)=>
{
  controllers.cart.modifyCart(req.session.userId,req.params['productId'],req.params['action'], ()=>res.redirect('/User/Cart'));
});

router.use('/Cart',UserAuthGuard,(req,res,next)=>
{
    controllers.cart.renderPage(req, res);
});

router.use('/CheckOut',UserAuthGuard,(req,res,next)=>
{
    controllers.cart.checkOut(req.session.userId,()=>{res.redirect('/User/Orders');});
});

router.use('/Orders',UserAuthGuard,(req,res,next)=>
{
    controllers.orders.renderPage(res);
});

router.use('/AddToCart',UserAuthGuard,(req,res,next)=>
{
    controllers.cart.addToCart(req.session.userId, req.body.productID, res);
});

router.use((request, response, next) => {
    if (request.originalUrl != "/User" && request.originalUrl != "/User/")  //wrong route
    {
      response.status(404).render('404',{module:'enduser',page:'404', isLoggedIn:request.session.isLoggedIn});
    }
    else //empty route
    { 
      response.redirect("/User/Products");
    }
  });

module.exports = router;