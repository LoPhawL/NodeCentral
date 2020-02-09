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

    Save(savedCallBack)
    {
        const data =  require('../app').get('books');//Book.GetAllBooks();
        data.push(this);
        fs.writeFile(storagePath, JSON.stringify(data), ()=>{savedCallBack();});
    }

    static GetAllBooks(callBack)
    {
        // if(!fs.existsSync(storagePath))
        //     {fs.writeFileSync(storagePath,JSON.stringify([]));}
        // return JSON.parse(fs.readFileSync(storagePath).toString());
        fs.exists(storagePath, exists=>
            {
                if (!exists)
                {
                    fs.writeFile(storagePath,JSON.stringify([]), () => {callBack([])});
                }
                else
                {
                    fs.readFile(storagePath,(err,data)=>
                    {
                        if(!err)
                        {
                            callBack(JSON.parse(data));
                        }
                    });
                }
            });
    }
}

module.exports = Book;