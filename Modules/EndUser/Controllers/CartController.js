// const Cart = require('../Models/Cart').cart;
// const cart =  new Cart( require('../../../app').get('endUser') );
const CartItem = require('../Models/CartItem').cartItem;
// const Product = require('../../Common/Models/Product');
const User = require('../../Common/Models/User');
const mongoDb = require('mongodb');


function Render_CartPage(userId, response)
{
    User.find(userId).populate('cart.productId').then(result =>
        {
            response.send();
            
            // const cartItemsForView = [];
            // let cartValue = 0;
            // if (result && result.cart && Boolean(result.cart.length))
            // {
            //     for (const item of result.cart)
            //     {
            //         Product.GetProduct(item.prodId).then
            //         (
            //             product =>
            //             {
            //                 cartValue += (product.price * item.quantity);
            //                 cartItemsForView.push({...product,quantity:item.quantity});
            //                 if(result.cart.indexOf(item) == result.cart.length-1)
            //                 {
            //                     response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
            //                 }
            //             }
            //         ).catch();
            //     }
            // }
            // else
            // {
            //     response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
            // }
        }).catch(err =>{});
}

function AddToCart(userId, productId, res)
{
    User.findOne(userId).then(user => 
        {
            if(user.cart.length > 0) // cart is present for the user.
            {
                var updatingCartItem = user.cart.filter(dbCartItem => { 
                    return dbCartItem.productId.equals(new mongoDb.ObjectID(productId));
                 });
                if(updatingCartItem.length)//Product added is already present in the cart.
                {
                    user.cart[user.cart.indexOf(updatingCartItem[0])].quantity+=1;
                }
                else// Product added is not present in the cart.
                {
                    user.cart.push({productId:productId, quantity:1});
                }
            }
            else
            {
                user.cart.push({productId:productId, quantity:1})
            }
            user.save();//async, function returns before saving.
            return;
        }).catch(err =>{console.log(err);});
    // cart.AddItem(new CartItem(productID,1), resultOrError => res.redirect('/User'));
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

function CheckOut(callBack)
{
    cart.CheckOut(callBack);
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart,
    // modifyCart:ModifyCart,
    // clear:Clear,
    // checkOut:CheckOut
}
