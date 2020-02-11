function Render_ProductsPage(response)
{
    response.render('../Views/AddProduct', {module:'admin',page:'AddProduct'})
}

module.exports = 
{
    renderPage:Render_ProductsPage
}
