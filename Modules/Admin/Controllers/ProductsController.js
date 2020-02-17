function Render_ProductsPage(response)
{
    const prod = require('../../Common/Models/Product');
    prod.GetAllProducts(data => 
        {
            response.render('Product_a', 
            {
                module:'admin',
                page:'Products', 
                products: JSON.parse(JSON.stringify(data))//require('../../../app').get('products')
            });
        });
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
