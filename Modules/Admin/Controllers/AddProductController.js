const Product = require('../../Common/Models/Product');

function Render_ProductsPage(request, response)
{
    response.render('../Views/AddProduct', {module:'admin',page:'AddProduct',isLoggedIn:request.session.isLoggedIn });
}

function Render_EditProduct(request, response, id)
{
    Product.findById(id).then
    (
        product=>{
            response.render('../Views/AddProduct', {module:'admin',page:'EditProduct', product:product, productID:id,isLoggedIn:request.session.isLoggedIn });
        }
    ).catch(err=>{console.log(err);});
    return;
}

function SaveProduct(requestBody,adminId, ProductSavedCallback)
{
    const prod = new Product(
        {
            name:requestBody.pName,
            url: 'https://source.unsplash.com/600x600/?'+requestBody.pImageUrl,
            price: requestBody.pPrice,
            description: requestBody.pDesc,
            createdBy:adminId
        });
    prod.save().then(result => {ProductSavedCallback();});
}

function EditProduct(requestBody,adminId,editedCallBack)
{
    Product.findByIdAndUpdate(requestBody.editID, 
        {name:requestBody.pName, url:'https://source.unsplash.com/600x600/?'+requestBody.pImageUrl, price:+requestBody.pPrice, description:requestBody.pDesc, createdBy:adminId})
        .then(result => {console.log(result); editedCallBack();});
}

function DeleteProduct(id,res)
{
    //Dont delete if in cart
    Product.findByIdAndDelete(id).then(result => 
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
