const mongoose = require('mongoose');
const mongoDb = require('mongodb');

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        email:{type:String, required:true},
        name:{type:String,required:true},
        password:{type:String,required:true},
        isAdmin:{type:Boolean,required:true},
        cart:
            [
                {productId:{type:Schema.Types.ObjectId,required:true},quantity:{type:Number,required:true}}
            ]
    });

userSchema.methods.ClearCart = function(callBack)
{
    this.cart = [];
    this.save().then(result => callBack());
}

userSchema.methods.ModifyCart = function(productID, action, callBack)
{
    for(let cartItem of this.cart)
        {
            if (cartItem.productId.equals(new mongoDb.ObjectID(productID)))
            {
                if(action == 'reduce')
                {
                        if(cartItem.quantity == 1){callBack();return;}
                        cartItem.quantity -= 1;
                }
                else if(action == 'add')
                {
                    cartItem.quantity += 1;
                }
                else if(action == 'delete')
                {
                    this.cart.splice(this.cart.indexOf(cartItem),1);
                }
                this.save().then(result => callBack());
                return;
            }
        }
        callBack();
}

userSchema.methods.CheckOut = function(userId,callBack)
{
    const Order = require('../../EndUser/Models/Order');
    var order = new Order();
    order.userId = userId; 
    order.orderValue = 0;
    order.items = []
    for (var cartItem of this.cart)
    {
        order.items.push( {productId:cartItem.productId._id, quantity:cartItem.quantity,price:cartItem.productId.price} );
        order.orderValue += (cartItem.quantity * cartItem.productId.price);
    }
    order.save().then(result => 
        {
            this.cart = [];
            this.save()
            .then(result => callBack());
        });
}

module.exports = mongoose.model('User',userSchema);