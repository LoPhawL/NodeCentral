//Function names: Action(What)_Object(Which)
const app = require("../app");

function Get_AddProductPage(response)
{
    response.render('AddProduct', {page:'AddBook'});
}

function Add_Books(request,response)
{
    const data = request.body;
    app.get("books").push( { Name:data.pName, Cost:data.pCost } );
    response.redirect("/Home");
}

module.exports = 
{
    get_AddProductsPage : Get_AddProductPage,
    add_Books : Add_Books
};
