let CartItem = require('./CartItem').cartItem;
const db = require('../../../Utils/Database');

class Cart
{
    constructor(user)
    {
        this.user = 1;//user
    }
    
    AddItem(productID)
    {
       return db.then(pool =>
            {
                return pool.request().query(`Exec AddToCart @user = ${this.user}, @productId = ${productID}`);
            });
    }

    GetCart()
    {
        const query = 
        `Select *  Into #CartDetails From
        (SELECT P.Id as id, P.name, P.price, C.Quantity as quantity, P.url, p.price*c.Quantity as cost FROM Cart C INNER JOIN Products P ON 
        C.ProductId = P.Id WHERE UserId = ${this.user.toString()}) As T
    
        Select * from #CartDetails
        Select sum(cost) as total from #CartDetails

        Drop Table #CartDetails`;
      return db.then(pool =>
            {
                return pool.request().query(query);
            });
    };

    ReduceQuantity(id)
    {
        return db.then(pool => 
            {
                return pool.request().query
                    (
                        `if (Select Quantity from cart where ProductId = ${id} and UserId = ${this.user}) > 1
                            Begin
                                Update Cart Set Quantity -= 1 where ProductId = ${id} and UserId = ${this.user}
                            End`
                    )
                .then(result=>{}).catch(err=>console.log(err));
            });
        
    };

    IncreaseQuantity(id)
    {
        return this.AddItem(id);
    }

    Delete(id)
    {
        return db.then(pool => 
            {
                return pool.request().query(`Delete From cart where UserId = ${this.user} and ProductId = ${id}`)
                .then(result=>{}).catch(err=>console.log(err));
            });
    }

    ClearCart()
    {
        return db.then(pool => 
            {
                return pool.request().query(`Delete From cart where UserId = ${this.user}`)
                .then(result=>{}).catch(err=>console.log(err));
            });   
    }
}

module.exports = 
{
    cart:Cart
}