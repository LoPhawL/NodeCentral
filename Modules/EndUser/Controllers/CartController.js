function Render_CartPage(response)
{
    // console.log(require('../../../app').get('cart'));
    const app = require('../../../app');
    const cartDetails = app.get('cart').GetCart();
    const cartItems = cartDetails[0];
    const products = app.get('products');
    const cartItemsForView = [];
    for(const cartItem of cartItems)
    {
        let product = products[cartItem.productID];
        cartItemsForView.push(
            {
                id:products.indexOf(product),
                name:product.name,
                price:product.price,
                quantity:cartItem.quantity,
                url:product.url
            });
    }
    response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartDetails[1] });
}

function AddToCart(productID)
{
    require('../../../app').get('cart').AddItem(productID);
}

function ModifyCart(productID, action)
{
    const cart = require('../../../app').get('cart');
    if(action == 'reduce')
    {
        cart.ReduceQuantity(productID);
    }
    else if(action == 'add')
    {
        cart.IncreaseQuantity(productID);
    }
    else if(action == 'delete')
    {
        cart.Delete(productID);
    }
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart,
    modifyCart:ModifyCart
}
