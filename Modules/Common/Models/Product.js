const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema(
    {
        name:{type:String,required:true},
        url:{type:String, required:true},
        price:{type:Number, required:true},
        description:{type:String,required:true},
        createdBy:{type:Schema.Types.ObjectId, required:true, ref:'User'}
    });
        
module.exports = mongoose.model('Product',productsSchema);