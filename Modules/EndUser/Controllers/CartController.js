const Cart = require('../Models/Cart').cart;
const cart = new Cart();

function Render_CartPage(response)
{
    let cartItemsForView=[]
    let cartValue = 0;
    cart.GetCart().then(result => 
        {
            cartItemsForView = result.recordsets[0];
            response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:result.recordsets[1][0].total});
        });     
}

function AddToCart(productID, callBack)
{
    cart.AddItem(productID).then(result=>{callBack();});
}

function ModifyCart(productID, action, callBack)
{
    const cart = require('../../../app').get('cart');
    if(action == 'reduce')
    {
        cart.ReduceQuantity(productID).then(res => {callBack();});
    }
    else if(action == 'add')
    {
        cart.IncreaseQuantity(productID).then(res => {callBack();});
    }
    else if(action == 'delete')
    {
        cart.Delete(productID).then(res => {callBack();});
    }
}

function clearCart(res)
{
    cart.ClearCart().then(result=>{res.redirect('/User/Cart');});
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart,
    modifyCart:ModifyCart,
    clearCart:clearCart,
}
