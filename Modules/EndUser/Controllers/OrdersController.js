function Render_OrdersPage(response)
{
    response.render('Orders',{module:'enduser', page:'Orders'});
}

module.exports = 
{
    renderPage:Render_OrdersPage
}
