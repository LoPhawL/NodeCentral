const Product = require('../../Common/Models/Product');

function Render_ProductsPage(response)
{
    response.render('../Views/AddProduct', {module:'admin',page:'AddProduct'})
}

function SaveProduct(responseBody, ProductSavedCallback)
{
    const prod = new Product(responseBody.pName, responseBody.pImageUrl, responseBody.pPrice, responseBody.pDesc);
    prod.Save(() => {ProductSavedCallback();});
}

module.exports = 
{
    renderPage:Render_ProductsPage,
    saveProduct:SaveProduct
}
