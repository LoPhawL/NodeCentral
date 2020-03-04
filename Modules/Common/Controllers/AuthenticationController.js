function Login(modeConfig)
{
    const User = require('../Models/User');
    if (modeConfig % 2 == 0)
    {
        return User.findOne(  {  $and: [ {email:'ad@ad.com'} , {password:'123456'} ]  }  );        
    }
    else
    {
        return User.findOne({$and:[{email:'us1@a.com'},{password:'123456'}]});
    }
}

function SignUp(email = "test@test.com", password = "12345678",name="test", isAdmin = false)
{  
    const Security = require('../../../Utils/Security');
    const passwordDerivatives = Security.CreatePasswordHash(password);
}

module.exports = 
{
    login:Login,
    signup:SignUp
}