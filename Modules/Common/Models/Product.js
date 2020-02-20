const storagePath = require('path').join(__dirname , '/../../../Data/Products.json');//not needed after mongo
const fs = require('fs');//not needed after mongo


class Product
{
    constructor(name, url, price, description)
    {
        this.name = name;
        this.url = 'https://source.unsplash.com/600x600/?'+url;
        this.price = price;
        this.description = description;
    }

    Save(savedCallBack)
    {
        db.collection('Products').insertOne(this).then(result => 
            {
                savedCallBack();
            }).catch
            (
                error => {savedCallBack();}
            );
    }

    Edit(editId,editedCallBack)
    {
        const data =  require('../../../app').get('products');
        data[editId] = this;
        fs.writeFile(storagePath, JSON.stringify(data), ()=>{editedCallBack();});
    }

    static Delete(id)
    {
        const data =  require('../../../app').get('products');
        data.splice(id,1);
        fs.writeFileSync(storagePath, JSON.stringify(data));
    }

    static GetAllProducts(callBack)
    {
        require('../../../Utils/Database').getDbClient().db().collection('Products').then(result=>
        {
            console.log(result);
            callBack();
        });
    }

    static GetProduct(id)
    {
        //return require('../../../app'.get('products'))[id];
    }
}

module.exports = Product;