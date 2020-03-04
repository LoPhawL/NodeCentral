function Show_ProductDetails(request,response)
{
    const productId = request.params['productId']
    require('../../Common/Models/Product').findById(productId)
    .then(product => 
        {response.render('ProductDetails',
            {
                module:'enduser', 
                page:'Products', //ProductDetails
                product: product,
                productID:productId,
                isLoggedIn: request.session.isLoggedIn
            });});
}

module.exports = 
{
    renderPage:Show_ProductDetails
}