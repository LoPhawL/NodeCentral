const Cart = require('../Models/Cart').cart;
const cart =  new Cart( require('../../../app').get('endUser') );
const CartItem = require('../Models/CartItem').cartItem;
const Product = require('../../Common/Models/Product');

function Render_CartPage(response)
{
    cart.GetCart().then(result =>
        {
            const cartItemsForView = [];
            let cartValue = 0;
            if (result)
            {
                for (const item of result.products)
                {
                    Product.GetProduct(item.prodId).then
                    (
                        product =>
                        {
                            cartValue += (product.price * item.quantity);
                            cartItemsForView.push(
                                {
                                    id:item.prodId,
                                    name:product.name,
                                    price:product.price,
                                    quantity:item.quantity,
                                    url:product.url
                                });
                            if(result.products.indexOf(item) == result.products.length-1)
                            {
                                response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
                            }
                        }
                    ).catch();
                }
            }
            else
            {
                response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
            }
        }).catch(err =>{});
}

function AddToCart(productID,res)
{
    cart.AddItem(new CartItem(productID,1), resultOrError => res.redirect('/User'));
    // .then(result => {console.log(result);res.redirect('/User');}).catch(err => {console.log(err);});
}

function ModifyCart(productID, action, callBack)
{    
    if(action == 'reduce')
    {
        cart.ReduceQuantity(productID, callBack);
    }
    else if(action == 'add')
    {
        cart.IncreaseQuantity(new CartItem(productID,1),callBack);
    }
    else if(action == 'delete')
    {
        cart.Delete(productID,callBack);
    }
}

function Clear(callBack)
{
    cart.Clear(callBack);
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart,
    modifyCart:ModifyCart,
    clear:Clear
}
