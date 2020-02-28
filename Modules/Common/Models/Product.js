const db = require('../../../Utils/Database');//();
const mongoDb = require('mongodb');

class Product
{
    constructor(name, url, price, description)
    {
        this.name = name;
        this.url = 'https://source.unsplash.com/600x600/?'+url;
        this.price = price;
        this.description = description;
        this.createdBy = new mongoDb.ObjectID(require('../../../app').get('admin'));
    }

    Save(savedCallBack)
    {
        db.getDbClient.collection('Products').insertOne(this).then(result => 
            {
                savedCallBack();
            }).catch
            (
                error => {savedCallBack();}
            );
    }

    Edit(editId,editedCallBack)
    {
        db.getDbClient.collection('Products').updateOne({_id: new mongoDb.ObjectID(editId)},{$set:this})
        .then(result=>{editedCallBack();}).catch(err=>{console.log(err);});
    }

    static Delete(id)
    {
        return db.getDbClient.collection('Products').deleteOne({_id: new mongoDb.ObjectID(id)});
    }

    static GetAllProducts(callBack)
    {
        db.getDbClient.collection('Products').find().toArray().then(
            result=>
            {
                callBack(result);
            }).catch(error =>{console.log(error);});
        // .then(
    }

    static GetProduct(id)
    {
       return db.getDbClient.collection('Products').findOne({_id: id});
    }
}

module.exports = Product;