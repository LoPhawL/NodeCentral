const cart = require('../../../app').get('cart');

function Render_CartPage(response)
{
    response.render('Cart',{module:'enduser', page:'Cart'});
}

function AddToCart(productID)
{
    cart.AddItem(productID);
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart
}
