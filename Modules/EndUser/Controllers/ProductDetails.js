function Show_ProductDetails(productId,response)
{
    const product = require('../../../app').get('products')[productId];
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

module.exports = 
{
    renderPage:Show_ProductDetails
}