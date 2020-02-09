//Function names: Action(What)_Object(Which)
const app = require("../app");

let Get_HomePage = function(response)
{
    const books = app.get('books');
    response.render('Home',{books:books, page:'Home'});
}

module.exports = {get_HomePage:Get_HomePage};