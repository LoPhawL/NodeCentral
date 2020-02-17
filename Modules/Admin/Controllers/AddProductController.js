const Product = require('../../Common/Models/Product');

function Render_ProductsPage(response)
{
    response.render('../Views/AddProduct', {module:'admin',page:'AddProduct'});
}

function Render_EditProduct(response, id)
{
    // const product = require('../../../app').get('products')[id];
    Product.GetProduct(id, (err,data) => 
        {
            response.render('../Views/AddProduct', {module:'admin',page:'EditProduct', product:JSON.parse(JSON.stringify(data.recordset[0])), productID:id});
        });
}

function SaveProduct(requestBody, ProductSavedCallback)
{
    const prod = new Product(requestBody.pName, requestBody.pImageUrl, requestBody.pPrice, requestBody.pDesc);
    prod.Save(() => {ProductSavedCallback();});
}

function EditProduct(requestBody,editedCallBack)
{
    const prod = new Product(requestBody.pName, requestBody.pImageUrl, requestBody.pPrice, requestBody.pDesc);
    prod.SetId(requestBody.editID)
    prod.Edit(editedCallBack);
}

function DeleteProduct(id, callBack)
{
    Product.Delete(id, callBack);
}

module.exports = 
{
    renderPage:Render_ProductsPage,
    saveProduct:SaveProduct,
    render_editProduct:Render_EditProduct,
    editProduct:EditProduct,
    deleteProduct:DeleteProduct
}
