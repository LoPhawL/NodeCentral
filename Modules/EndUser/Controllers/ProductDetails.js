const db = require('../../../Utils/Database')

function Show_ProductDetails(productId,response)
{
    db.then(pool => { pool.request().query('Select * from Products where id = '+productId.toString(), 
        (err,data)=>
        {
            const product = JSON.parse(JSON.stringify(data.recordset[0]));
            if(! product || product == undefined)
            {
                response.status(404).render('404',{module:'enduser',page:'404'});
                return;
            }
            response.render('ProductDetails',
            {
                    module:'enduser', 
                    page:'Products', //ProductDetails
                    product: product,
                    productID:productId
            });
        }
    )});
}

module.exports = 
{
    renderPage:Show_ProductDetails
}