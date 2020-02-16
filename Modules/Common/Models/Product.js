const storagePath = require('path').join(__dirname , '/../../../Data/Products.json');
const fs = require('fs');
const db = require('../../../Utils/Database');

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
        db.then(pool => 
            {
                pool.request().query(`Insert into Products Values ('${this.name}','${this.url}','${this.description}',${this.price})`)
                .then(res => {console.log(res);
        })});
        fs.writeFile(storagePath, JSON.stringify(data), ()=>{savedCallBack();});
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
        db.then(pool => 
            {
                pool.request().query('Select * from Products',(err,res)=>
                {
                    callBack(res.recordset);
                })
            }).catch(err=>{console.log('error');});
        // fs.exists(storagePath, exists=>
        //     {
        //         if (!exists)
        //         {
        //             fs.writeFile(storagePath,JSON.stringify([]), () => {callBack([])});
        //         }
        //         else
        //         {
        //             fs.readFile(storagePath,(err,data)=>
        //             {
        //                 if(!err)
        //                 {
        //                     callBack(JSON.parse(data));
        //                 }
        //             });
        //         }
        //     });
    }

    static GetProduct(id)
    {
        //return require('../../../app'.get('products'))[id];
    }
}

module.exports = Product;