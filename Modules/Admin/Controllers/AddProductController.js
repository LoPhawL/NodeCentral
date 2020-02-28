const Product = require('../../Common/Models/Product');

function Render_ProductsPage(response)
{
    response.render('../Views/AddProduct', {module:'admin',page:'AddProduct'});
}

function Render_EditProduct(response, id)
{
    Product.GetProduct(id).then
    (
        product=>{
            response.render('../Views/AddProduct', {module:'admin',page:'EditProduct', product:product, productID:id});
        }
    ).catch(err=>{console.log(err);});
    return;
}

function SaveProduct(requestBody, ProductSavedCallback)
{
    const prod = new Product(requestBody.pName, requestBody.pImageUrl, requestBody.pPrice, requestBody.pDesc);
    prod.Save(() => {ProductSavedCallback();});
}

function EditProduct(requestBody,editedCallBack)
{
    const prod = new Product(requestBody.pName, requestBody.pImageUrl, requestBody.pPrice, requestBody.pDesc);
    const editId = requestBody.editID;
    prod.Edit(editId,editedCallBack);
}

function DeleteProduct(id,res)
{
    //Dont delete if in cart
    Product.Delete(id).then(result => 
        {
            res.redirect('Products');
        });
}

module.exports = 
{
    renderPage:Render_ProductsPage,
    saveProduct:SaveProduct,
    render_editProduct:Render_EditProduct,
    editProduct:EditProduct,
    deleteProduct:DeleteProduct
}
