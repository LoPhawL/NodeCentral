let CartItem = require('./CartItem').cartItem;
const path = require('path');
const fs = require('fs');
const allProducts = require('../../../app').get('products');

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
   
    AddItem (cartItem)
        {
            const transfrmedCartItem = JSON.parse(JSON.stringify(`${cartItem.productID}:${cartItem.quantity}`) );
            console.log(transfrmedCartItem);
            
            if (true)//cart is not present for the user. i.e, no document with userId exists in cart collection.
            {
                //Create cart with the userid and added product.
                return this.db.getDbClient.collection('Cart').insertOne({userId:this.userId,products:{transfrmedCartItem}});
            }

            if (true)//cart is present for the user. Product added is not present in the cart.
            {
                //add product to the cart, i.e products nested document.
            }

            if(true)//cart is present for the user. Product added is already present in the cart.
            {
                //increment the quantity of the productId in the nested product document.
            }
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