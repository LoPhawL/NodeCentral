const mongoClient = require('mongodb').MongoClient;

const _db = null;

function ConnectDB(callBack)
{
    mongoClient.connect('mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/test?retryWrites=true&w=majority')
    .then(client =>{_db = client.db(); callBack();}).catch(err=>{console.log(err);
    });
}

function GetDB()
{
    if(_db)
    {
        return _db
    }
    throw('DB is not connected');
}

module.exports = 
{
    startClient:ConnectDB,
    db:GetDB
}