const storagePath = require('path').join(__dirname , '/../../../Data/Products.json');
const fs = require('fs');

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
        const data =  require('../../../app').get('products');
        data.push(this);
        fs.writeFile(storagePath, JSON.stringify(data), ()=>{savedCallBack();});
    }

    static GetAllProducts(callBack)
    {
        fs.exists(storagePath, exists=>
            {
                if (!exists)
                {
                    fs.writeFile(storagePath,JSON.stringify([]), () => {callBack([])});
                }
                else
                {
                    fs.readFile(storagePath,(err,data)=>
                    {
                        if(!err)
                        {
                            callBack(JSON.parse(data));
                        }
                    });
                }
            });
    }

    static GetProduct(id)
    {
        //return require('../../../app'.get('products'))[id];
    }
}

module.exports = Product;