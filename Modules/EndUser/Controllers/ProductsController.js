function Render_ProductsPage(response)
{
    const prod = require('../../Common/Models/Product');
    prod.GetAllProducts(data => 
        {
            response.render('Product_a', 
            {
                module:'enduser',
                page:'Products', 
                products: JSON.parse(JSON.stringify(data))
            });
        });
}

module.exports = 
{
    renderPage:Render_ProductsPage
}