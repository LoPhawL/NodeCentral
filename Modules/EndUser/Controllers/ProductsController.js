function Render_ProductsPage(response)
{
    require('../../Common/Models/Product').find().then
    (
        products =>
        {
            response.render('Products_u',{module:'enduser', page:'Products', products: products});
        }
    );
}

module.exports = 
{
    renderPage:Render_ProductsPage
}