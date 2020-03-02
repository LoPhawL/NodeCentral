const Order = require('../Models/Order');

function Render_OrdersPage(response)
{
    // response.render('Orders',{module:'enduser', page:'Orders'});
    Order.find().then(res => {response.send(res)});
    
}

module.exports = 
{
    renderPage:Render_OrdersPage
}
