function Render_ProductsPage(response)
{
    require('../../Common/Models/Product').GetAllProducts((data)=>
    {
        response.render('Product_a', {module:'admin',page:'Products', products:data });
    });
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
