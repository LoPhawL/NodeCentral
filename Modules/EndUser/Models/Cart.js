let CartItem = require('./CartItem').cartItem;
const db = require('../../../Utils/Database');
const mongoDb = require('mongodb');

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
            db.getDbClient.collection('Cart').findOne({userId:this.userId})
            .then(result => 
                {
                    if(result) // cart is present for the user.
                    {
                        for (const item of result.products)
                        {
                            if(item.prodId == cartItem.productID)//cart is present for the user. Product added is already present in the cart.
                            {   
                                item.quantity += 1;//increment the quantity of the productId in the product document.
                                db.getDbClient.collection('Cart')
                                .updateOne({_id:new mongoDb.ObjectID(result._id)}, {$set:result})
                                .then
                                (
                                    result =>{callBack();}//console.log('Item is already present in the cart. Increased quantity.');
                                ).catch(err=>{console.log('Error while increasing quantity');callBack();});
                                return;
                            }
                        }
                        //cart is present for the user. Product added is not present in the cart.
                        result.products.push({prodId:cartItem.productID,quantity:cartItem.quantity});
                        db.getDbClient.collection('Cart')
                                .updateOne({_id:new mongoDb.ObjectID(result._id)}, {$set:result})
                                .then
                                (
                                    result =>{callBack();}//console.log('Cart exists for the user, but item is not present. Added item.');
                                ).catch(err=>{console.log('Error while adding item to existing cart');callBack();});
                    }
                    else//cart is not present for the user. i.e, no document with userId exists in cart collection.
                    {
                         //Create cart with the userid and added product.
                        this.db.getDbClient.collection('Cart').insertOne({userId:this.userId,products:[{prodId:cartItem.productID,quantity:cartItem.quantity}]})
                        .then(result=>{callBack();}).catch(err=>{callBack();});//console.log('Cart is not present. Created cart with the added item');
                    }
                })
            .catch(err =>{console.log('Error while fetching cart of the user.');});
            return;
        }
    GetCart()
        {
            return db.getDbClient.collection('Cart').findOne({userId:this.userId});
        }

    ReduceQuantity(productID, callBack)
        {
            this.GetCart()
            .then(result => 
            {
                for(let cartItem of result.products)
                {
                    if (cartItem.prodId == productID)
                    {
                        if(cartItem.quantity == 1){callBack();return;}
                        cartItem.quantity -= 1;
                        break;
                    }
                }
                db.getDbClient.collection('Cart')
                            .updateOne({_id:new mongoDb.ObjectID(result._id)}, {$set:result})
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
                for(let cartItem of result.products)
                {
                    if (cartItem.prodId == productID)
                    {
                       result.products.splice(result.products.indexOf(cartItem),1);
                    }
                }
                if(result.products.length < 1) //delete cart
                {
                    this.Clear(callBack);
                    return;
                    // db.getDbClient.collection('Cart')
                    //                 .deleteOne({userId:this.userId})
                    //                 .then(result =>{;callBack();}).catch(err=>{callBack();});
                }
                else{
                        db.getDbClient.collection('Cart')
                                    .updateOne({_id:new mongoDb.ObjectID(result._id)}, {$set:result})
                                    .then
                                    (
                                        result =>{callBack();}
                                    ).catch(err=>{callBack();});
                    }
            }).catch();
        }
    
    Clear(callBack)
    {
        db.getDbClient.collection('Cart')
                                    .deleteOne({userId:this.userId})
                                    .then(result =>{;callBack();}).catch(err=>{callBack();});
    }
}

module.exports = 
{
    cart:CartHelper
}