function Render_ProductsPage(response)
{
    const products = require('../../Common/Models/Product').GetAllProducts();
    response.render('Products_u',{module:'enduser', page:'Products', products: products});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}