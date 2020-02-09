const books = [];

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
        books.push(this);
    }

    static GetAllBooks()
    {
        return books;
    }
}

module.exports = Book;