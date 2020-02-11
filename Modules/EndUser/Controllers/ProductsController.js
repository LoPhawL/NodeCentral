function Render_ProductsPage(response)
{
    response.render('Products_u',{module:'enduser', page:'Products'});
}

module.exports = 
{
    renderPage:Render_ProductsPage
}