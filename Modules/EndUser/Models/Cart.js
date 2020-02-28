// let CartItem = require('./CartItem').cartItem;
const db = require('../../../Utils/Database');
const mongoDb = require('mongodb');
const Order = require('./Order').order;

class CartHelper
{
    constructor(userId)
    {
        this._id = null;
        this.userId =  userId;
        this.products = {};

        this.db = require('../../../Utils/Database');
        this.mongoDb = require('mongodb');
    }
   
    AddItem (cartItem, callBack)
        {
            db.getDbClient.collection('Users').findOne({_id:this.userId},{projection:{cart:1}})//findOne({userId:this.userId})
            .then(result => 
                {
                    if(result.cart) // cart is present for the user.
                    {
                        var updatingCartItem = result.cart.filter(dbCartItem => cartItem.prodId.equals(dbCartItem.prodId));
                        if(updatingCartItem.length)//Product added is already present in the cart.
                        {
                            let newCartItem = {...updatingCartItem[0]};
                            newCartItem.quantity += 1;
                            result.cart[result.cart.indexOf(updatingCartItem[0])] =  newCartItem;
                        }
                        else// Product added is not present in the cart.
                        {
                            result.cart.push({...cartItem});
                        }
                        this.db.getDbClient.collection('Users').updateOne({_id:this.userId},{$set:{cart:result.cart}})
                        .then(res => {callBack();});
                    }
                    else//cart is not present for the user. i.e, no document with userId exists in cart collection.
                    {
                    //      //Create cart with the userid and added product.
                         this.db.getDbClient.collection('Users').updateOne({_id:this.userId},{$set:{cart:[{prodId:cartItem.prodId,quantity:cartItem.quantity }]}})
                        .then(result=>{callBack();}).catch(err=>{callBack();});//console.log('Cart is not present. Created cart with the added item');
                    }
                })
            .catch(err =>{console.log('Error while fetching cart of the user.');});
            return;
        }
    GetCart()
        {
            return db.getDbClient.collection('Users').findOne({_id:this.userId},{projection:{cart:1}});
        }

    ReduceQuantity(productID, callBack)
        {
            this.GetCart()
            .then(result => 
            {
                for(let cartItem of result.cart)
                {
                    if (cartItem.prodId.equals(new mongoDb.ObjectID(productID)))
                    {
                        if(cartItem.quantity == 1){callBack();return;}
                        cartItem.quantity -= 1;
                        break;
                    }
                }
                db.getDbClient.collection('Users')
                            .updateOne({_id:this.userId}, {$set:{cart:result.cart}})
                            .then
                            (
                                result =>{callBack();}
                            ).catch(err=>{console.log('Error increasing quantity');callBack();});
            }).catch();
        }

    IncreaseQuantity (cartItem, callBack)
        {
            this.AddItem(cartItem,callBack);
        }

    Delete (productID, callBack)
        {
            this.GetCart()
            .then(result => 
            {
                for(let cartItem of result.cart)
                {
                    if (cartItem.prodId.equals(new mongoDb.ObjectID(productID)))
                    {
                       result.cart.splice(result.cart.indexOf(cartItem),1);
                    }
                }
                if(result.cart.length < 1) //delete cart
                {
                    this.Clear(callBack);
                    return;
                    // db.getDbClient.collection('Cart')
                    //                 .deleteOne({userId:this.userId})
                    //                 .then(result =>{;callBack();}).catch(err=>{callBack();});
                }
                else{
                    db.getDbClient.collection('Users')
                                    .updateOne({_id:this.userId}, {$set:{cart:result.cart}})
                                    .then
                                    (
                                        result =>{callBack();}
                                    ).catch(err=>{callBack();});
                    }
            }).catch();
        }
    
    Clear(callBack)
    {
        db.getDbClient.collection('Users')
                                    .updateOne({_id:this.userId}, {$unset:{cart:''}})
                                    .then(result =>{;callBack();}).catch(err=>{callBack();});
    }

    CheckOut(callBack)
    {
        return Order.CheckOut(this, callBack);
    }
}

module.exports = 
{
    cart:CartHelper
}