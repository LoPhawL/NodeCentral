function Render_ProductsPage(request, response)
{
    require('../../Common/Models/Product').find().then
    (
        products =>
        {
            response.render('Products_u',{module:'enduser', page:'Products', products: products,isLoggedIn:request.session.isLoggedIn});
        }
    );
}

module.exports = 
{
    renderPage:Render_ProductsPage
}