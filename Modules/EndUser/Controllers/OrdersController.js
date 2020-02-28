const Order = require('../Models/Order').order

function Render_OrdersPage(response)
{
    // response.render('Orders',{module:'enduser', page:'Orders'});
    Order.GetOrders().then(res => {response.send(res)});
    
}

module.exports = 
{
    renderPage:Render_OrdersPage
}
