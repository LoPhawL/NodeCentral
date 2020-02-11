function Render_ProductsPage(response)
{
    response.render('Products_a', {module:'admin',page:'Products'});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
