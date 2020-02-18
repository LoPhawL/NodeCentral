const mongoClient = require('mongodb').MongoClient;

const _db;

function ConnectDB(callBack)
{
    mongoClient.connect('mongodb+srv://jas:123$%^@cluster0-fh9tz.mongodb.net/test?retryWrites=true&w=majority')
    .then(client =>{_db = client.db();}).catch();
}
