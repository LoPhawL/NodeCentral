const mongoClient = require('mongodb').MongoClient;

let db = null;

function ConnectDB(callBack)
{
    const uri = 'mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/Mane?retryWrites=true&w=majority';
    const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        db = client.db();
        module.exports.getDbClient = db;
         callBack();
});
}

// function GetDB()
// {
//     if(db)
//     {
//         return db
//     }
//     return null;
//     // throw('DB is not connected');
// }

module.exports = 
{
    startClient:ConnectDB,
    getDbClient:db//GetDB
}