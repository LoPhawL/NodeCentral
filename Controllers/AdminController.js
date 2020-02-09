//Function names: Action(What)_Object(Which)
const app = require("../app");
const Book = require('../Models/Books')

function Get_AddProductPage(response)
{
    response.render('AddProduct', {page:'AddBook'});
}

function Add_Books(request,response)
{
    const data = request.body;
    app.get("books").push( new Book(data.pName, data.pCost, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, exercitationem?') );
    // { Name:, Cost: }
    response.redirect("/Home");
}

module.exports = 
{
    get_AddProductsPage : Get_AddProductPage,
    add_Books : Add_Books
};
