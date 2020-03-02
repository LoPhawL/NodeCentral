// const Cart = require('../Models/Cart').cart;
// const cart =  new Cart( require('../../../app').get('endUser') );
const CartItem = require('../Models/CartItem').cartItem;
// const Product = require('../../Common/Models/Product');
const User = require('../../Common/Models/User');
const mongoDb = require('mongodb');


function Render_CartPage(userId, response)
{
    User.findById(userId).populate({path:'cart.productId',model:'Product', select:'-description -createdBy -__v'})
    .then(user =>
        {
            const cartItemsForView = [];
            let cartValue = 0;
            if (user && user.cart && Boolean(user.cart.length))
            {
                for (const item of user.cart)
                {
                    cartValue += (item.productId.price * item.quantity);
                    cartItemsForView.push({_id:item.productId._id,name:item.productId.name,price:item.productId.price,url:item.productId.url,quantity:item.quantity});
                }
                response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
                return;
            }
            else
            {
                response.render('Cart',{module:'enduser', page:'Cart', cart:cartItemsForView, cartValue:cartValue });
            }
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
            res.redirect('/User');
        }).catch(err =>{console.log(err);});
}

function ModifyCart(userId, productID, action, callBack)
{    
    User.findById(userId).select('cart').then(user=> 
    {
        user.ModifyCart(productID, action, callBack);
    });
}

function Clear(userId,callBack)
{
    User.findById(userId).then(user => user.ClearCart(callBack));
}

function CheckOut(userId,callBack)
{
    User.findById(userId).populate({path:'cart.productId',model:'Product', select:'-url -description -createdBy -__v'})
    .then(user => user.CheckOut(userId,callBack));
}

module.exports = 
{
    renderPage:Render_CartPage,
    addToCart:AddToCart,
    modifyCart:ModifyCart,
    clear:Clear,
    checkOut:CheckOut
}
