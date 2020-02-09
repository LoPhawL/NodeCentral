const fs = require('fs');
const storagePath = require('../Utils/Path')+'\\Data\\books.json';

class Book
{
    constructor(name,cost,description)
    {
        this.name = name;
        this.cost = cost;
        this.description = description;
    }

    Save()
    {
        const data =  require('../app').get('books');//Book.GetAllBooks();
        data.push(this);
        fs.writeFileSync(storagePath, JSON.stringify(data));
    }

    static GetAllBooks()
    {
        if(!fs.existsSync(storagePath))
            {fs.writeFileSync(storagePath,JSON.stringify([]));}
        return JSON.parse(fs.readFileSync(storagePath).toString());
    }
}

module.exports = Book;