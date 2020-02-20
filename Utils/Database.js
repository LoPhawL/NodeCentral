const mongoClient = require('mongodb').MongoClient;

let _db = null;

function ConnectDB(callBack)
{
    // mongoClient.connect('mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true })
    // .then(client =>{_db = client.db(); callBack();}).catch(err=>{console.log(err);});

    const uri = 'mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/Mane?retryWrites=true&w=majority';
    const client = new mongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        // const collection = client.db("test").collection("devices");
        _db = client;//.db();
         callBack();
});
}

function GetDB()
{
    if(_db)
    {
        return _db
    }
    return null;
    // throw('DB is not connected');
}

module.exports = 
{
    startClient:ConnectDB,
    getDbClient:GetDB
}