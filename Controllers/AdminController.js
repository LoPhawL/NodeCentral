//Function names: Action(What)_Object(Which)
const Book = require('../Models/Books')

function Get_AddProductPage(response)
{
    response.render('../Views/AddProduct.ejs', {page:'AddBook'});
}

function Add_Books(request,response)
{
    const data = request.body;
    const book = new Book(data.pName, data.pCost, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, exercitationem?');
    // app.get("books").push(book);
    book.Save(()=>{ response.redirect("/Home");});
    // { Name:, Cost: }
   
}

module.exports = 
{
    get_AddProductsPage : Get_AddProductPage,
    add_Books : Add_Books
};
