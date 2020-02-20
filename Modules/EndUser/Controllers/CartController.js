const Cart = require('../Models/Cart').cart;
const cart =  new Cart(1);
const CartItem = require('../Models/CartItem').cartItem;

function Render_CartPage(response)
{
    // console.log(require('../../../app').get('cart'));
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
    cart.AddItem(new CartItem(productID,1))
    .then(result => {console.log(result);res.redirect('/User');}).catch(err => {console.log(err);res.redirect('/User');});
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
