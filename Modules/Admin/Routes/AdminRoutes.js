const router = require('express').Router();
const controllers = 
{
        products : require('../Controllers/ProductsController'),
        addProduct : require('../Controllers/AddProductController'),
};

router.use('/Products',(req,res,next)=>
{
  controllers.products.renderPage(res);
});

router.post('/AddProduct',(req,res,next)=>
{
  controllers.addProduct.saveProduct(req.body,req.admin, ()=>{ res.redirect('Products');});
});

router.use('/AddProduct',(req,res,next)=>
{
    controllers.addProduct.renderPage(res);
});

router.post('/EditProduct',(req,res,next)=>
{
  controllers.addProduct.editProduct(req.body,req.admin, ()=>{ res.redirect('/');});
});

router.use('/EditProduct',(req,res,next)=>
{
  controllers.addProduct.render_editProduct(res, req.query.id);
});

router.use('/DeleteProduct',(req,res,next)=>
{
  controllers.addProduct.deleteProduct(req.query.id, res);  
});

router.use((request, response, next) => {
    if (request.originalUrl != "/Admin" && request.originalUrl != "/Admin/")  //wrong route
    {
      response.status(404).render('404',{module:'admin',page:'404'});
    }
    else //empty route
    { 
      response.redirect("/Admin/Products");
    }
  });


module.exports = router;
