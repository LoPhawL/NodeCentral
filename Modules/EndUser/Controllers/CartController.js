function Render_CartPage(response)
{
    response.render('Cart',{module:'enduser', page:'Cart'});
}

module.exports = 
{
    renderPage:Render_CartPage
}
