
function Render_CartPage(response)
{
    var a = require('../../../app').get('cart').GetCart();
    response.render('Cart',{module:'enduser', page:'Cart', cart:a});
}

function AddToCart(productID)
{
    require('../../../app').get('cart').AddItem(productID);
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart
}
