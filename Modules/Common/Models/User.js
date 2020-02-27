const mongodb = require('mongodb');
const db = require('../../../Utils/Database');

class User
{
    constructor(name, email, admin)
    {
        this.name = name;
        this.email = email;
        this.isAdmin = admin;
    }

    Save()
    {
        return db.getDbClient.collection('Users').insertOne(this);
        // .then(result=>{console.log(result);callBack();})
        // .catch(err => {console.log(err);callBack();});
    }

    static GetUser(userId)
    {
        return db.getDbClient.collection('Users').findOne({_id:new mongodb.ObjectID(userId)});
        // .then()
        // .catch();
    }

    static Login(uEmail, uPassword)
    {   
        return db.getDbClient.collection('Users').findOne({$and:[{"email":uEmail},{"password":uPassword}]});
    }
}

module.exports = 
{
    user:User
}