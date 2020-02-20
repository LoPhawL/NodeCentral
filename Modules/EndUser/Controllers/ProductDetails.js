function Show_ProductDetails(productId,response)
{
    require('../../Common/Models/Product').GetProduct(productId)
    .then(product => 
        {response.render('ProductDetails',
            {
                module:'enduser', 
                page:'Products', //ProductDetails
                product: product,
                productID:productId
            });});
}

module.exports = 
{
    renderPage:Show_ProductDetails
}