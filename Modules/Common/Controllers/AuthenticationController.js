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
    // request.session.LoggedIn = true;

    // if(!request.session.counter)
    // {request.session.counter = 1;}
    // else{request.session.counter += 1;}

    // if(request.session.counter % 2 == 0)
    // {request.session.userMode = 'admin';response.redirect('/Admin');}
    // else{request.session.userMode = 'user';response.redirect('/User');}
}

module.exports = 
{
    login:Login
}