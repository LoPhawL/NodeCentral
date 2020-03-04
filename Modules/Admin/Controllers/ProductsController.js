function Render_ProductsPage(request, response)
{
    require('../../Common/Models/Product').find()
    .then((data)=>
    {
        response.render('Product_a', {module:'admin',page:'Products', products:data, isLoggedIn:request.session.isLoggedIn });
    });
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
