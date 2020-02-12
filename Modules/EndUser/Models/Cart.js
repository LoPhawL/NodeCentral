class Cart
{
    constructor()
    {
        this.length = 0;
        let items = [];
        this.AddItem = function(productID){items.push(+productID); this.length += 1; console.log(items);};
        this.RemoveItem = function(productID)
        {
            if(productID in items)
            {
                items.splice(items.indexOf(productID),1);
                this.length -= 1;
            }
        }
        this.GetCart = function(){return items.splice();};
    }
}

module.exports = 
{
    cart: Cart
}