const mongoDb = require('mongodb');

class CartItem
{
    constructor(productID, quantity)
    {
        this.prodId = new mongoDb.ObjectID(productID);
        this.quantity = quantity;
    }
}

module.exports = 
{
    cartItem : CartItem
}