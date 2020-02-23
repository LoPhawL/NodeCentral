const db = require('../../../Utils/Database');

class Product
{
    constructor(name, url, price, description)
    {
        this.id = null;
        this.name = name;
        this.url = 'https://source.unsplash.com/600x600/?'+url;
        this.price = price;
        this.description = description;
    }

    SetId(id)
    {
        this.id = id;
    }

    Save(savedCallBack)
    {
        db.then(pool => 
            {
                pool.request().query(`Insert into Products Values ('${this.name}','${this.url}','${this.description}',${this.price})`)
                .then(res => {savedCallBack();
        })});
    }

    Edit(editedCallBack)
    {
        const query = `exec Edit_Product @Id = ${this.id.toString()}, @name = '${this.name}', @url = '${this.url}', @description = '${this.description}', @price = ${this.price}`;
        db.then(pool=>
            {
                pool.request().query(query, (err,result) => {editedCallBack();});
            });
    }

    static Delete(id,DelectedCallBack)
    {
        db.then(pool =>
            {
                pool.request().query('exec Delete_Product @Id = '+id.toString(), (err,res)=>
                {
                    DelectedCallBack();
                });
                // .catch()
            } );
    }

    static GetAllProducts(callBack)
    {
        db.then(pool => 
            {
                pool.request().query('Select * from Products',(err,res)=>
                {
                    callBack(res.recordset);
                })
            }).catch(err=>{});
    }

    static GetProduct(id, callBack)
    {
        db.then(pool =>{pool.request().query('Select * from Products where id = '+id.toString(),
        (err, data)=>{callBack(err,data);}
        )});
    }
}

module.exports = Product;