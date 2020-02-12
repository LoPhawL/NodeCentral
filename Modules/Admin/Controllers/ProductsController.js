function Render_ProductsPage(response)
{
    response.render('Product_a', {module:'admin',page:'Products', products: require('../../../app').get('products')});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
