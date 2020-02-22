let CartItem = require('./CartItem').cartItem;
const db = require('../../../Utils/Database');
const mongoDb = require('mongodb');

class CartHelper
{
    constructor(userId)
    {
        this._id = null;
        this.userId = 1;
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

    RemoveItem ()
        {
            // if(productID in items)
            // {
            //     items.splice(items.indexOf(productID),1);
            //    length -= 1;
            // }
        }

    static GetCart ()
        {
            // return [[...items], this.cartValue];
        }

    Reduce()
        {
            // for(let cartItem of items)
            // {
            //     if (cartItem.productID == id && cartItem.quantity > 1)
            //    /         cartItem.quantity -= e1;
            //         this.cartValue -= +allProducts[id].price;
            //         break;
            //     }
            // }
            // this.WriteToJSON(items);
        }

    IncreaseQuantity ()
        {
            // for(let cartItem of items)
            // {
            //     if (cartItem.productID == id)
            //     {
            //         cartItem.quantity += 1;
            //         this.cartValue += +allProducts[id].price;
            //         break;
            //     }
            // }
            // this.WriteToJSON(items);
        }

    Delete ()
        {
            // for(let cartItem of items)
            // {
            //     if (cartItem.productID == id)
            //     {
            //         items.splice(items.indexOf(cartItem),1);
            //         this.cartValue -= (+allProducts[id].price * +cartItem.quantity);
            //         break;
            //     }
            // }
            // this.WriteToJSON(items);
        }
}

module.exports = 
{
    cart:CartHelper
}