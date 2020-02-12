function Render_ProductsPage(response)
{
    response.render('Product_a', {module:'admin',page:'Products'});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
