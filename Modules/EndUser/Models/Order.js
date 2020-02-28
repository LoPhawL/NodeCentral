const db = require('../../../Utils/Database');
// const mongoDb = require('mongodb');

class Order
{
    static CheckOut(cartObj, callBack)
    {
        cartObj.GetCart().then(cartResult => 
            {
                let userId = cartResult._id;
                const prodIds = cartResult.cart.map(cartItem => cartItem.prodId);
                db.getDbClient.collection('Products').find({_id:{$in:prodIds}}, {projection:{price:1}}).toArray()
                .then(priceResult=>
                    {
                        const Items = {}
                        priceResult.forEach(itemPrice => 
                            {
                                Items[(itemPrice._id)] = itemPrice.price
                            })
                        let orderValue = 0;
                        for(const cartItem of cartResult.cart)
                        {
                            cartItem.price = +Items[cartItem.prodId.toString()];
                            orderValue += (cartItem.quantity * cartItem.price);
                        }
                        const Order = 
                        {
                            userId :  userId,
                            Items : cartResult.cart,
                            orderValue : orderValue,
                            paymentMode : "COD"
                        }
                        db.getDbClient.collection('Orders').insertOne(Order)
                        .then(res => 
                            {
                                cartObj.Clear(callBack);
                            })
                        .catch( err=> console.log('Error in updating orders.',err))
                    }).catch(err=> console.log('Error in  fetching price',err))
            }).catch(err=> console.log('Error in reading cart',err));
        // 
    }

    static GetOrders()
    {
        return db.getDbClient.collection('Orders').find({userId:  require('../../../app').get('endUser')}).toArray();
    }
}

module.exports = 
{
    order:Order
}