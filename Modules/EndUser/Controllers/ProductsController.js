function Render_ProductsPage(response)
{
    response.render('Products_u',{module:'enduser', page:'Products', products: require('../../../app').get('products')});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}