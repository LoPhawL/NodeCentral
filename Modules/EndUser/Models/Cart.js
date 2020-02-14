let CartItem = require('./CartItem').cartItem;
const path = require('path');
const fs = require('fs');
const allProducts = require('../../../app').get('products');

class Cart
{
    constructor()
    {
        this.cartsJsonFile = path.dirname(process.mainModule.filename)+'/Data/Cart.json';
        this.length = 0;
        this.cartValue = 0;
        let items = [];

        this.AddItem = 
            function(productID)
            {
                if(items.length < 1) //cart is empty
                {
                    items.push(new CartItem(+productID,1));
                    this.cartValue += (+allProducts[productID].price);
                    this.length += 1;
                }
                else // cart is not empty
                {
                    for (let cartItem of items) //checking if the item added is already present in cart
                    {
                        if(cartItem.productID == productID) // item is already present in cart, hence increasing the quantity of the same item.
                        {
                            cartItem.quantity += 1;
                            this.cartValue += (+allProducts[productID].price);
                            this.WriteToJSON(items);
                            return;
                        }
                    }
                    // item is not found in cart, hence proceeding to add new cart item.
                    items.push(new CartItem(+productID,1));
                    this.cartValue += (+allProducts[productID].price);
                    this.length += 1;
                }

                this.WriteToJSON(items); // updating or writing the changes to json.
            };

        this.RemoveItem = 
            function(productID)
            {
                if(productID in items)
                {
                    items.splice(items.indexOf(productID),1);
                    this.length -= 1;
                }
            };

        this.GetCart = 
            function()
            {
                return items.splice([...items]);
            };

       this.ReadFromJSON = function()
            {// if json exists
                    // read and serialize json
                    // set this.items to items from json
                    // set this.cartValue to cartValue from json
                if(fs.existsSync(this.cartsJsonFile))
                {
                    const cartData = JSON.parse(fs.readFileSync(this.cartsJsonFile).toString());
                    items = cartData.items;
                    this.cartValue = cartData.cartValue;
                }
                else
                {
                    fs.writeFileSync(this.cartsJsonFile, JSON.stringify({items:items,cartValue:this.cartValue}));
                }
            }
        this.ReadFromJSON();
    }

    WriteToJSON(items)
    {
        fs.writeFileSync(this.cartsJsonFile, JSON.stringify({items:items,cartValue:this.cartValue}));
        // Check if json exists
            // if exists
                // rewrite items and cartValue to json
            // else
                // create and write items and cartValue to json
    }

    
}

module.exports = 
{
    cart:Cart
}