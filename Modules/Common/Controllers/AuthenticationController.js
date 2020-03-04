const User = require('../Models/User');
const Security = require('../../../Utils/Security');

function Login(request)
{
    const User = require('../Models/User');
    return User.findOne(  {email:request.body.email} )
    .then(user => 
        {
            if(user) //valid email
            {
                if(Security.HashEnteredPassword(request.body.password, user.signature) === user.passwordHash)
                {
                    return user; //valid password
                }
                return null;//invalid password
            }
            else//invalid email
            {
                return null; 
            }
        });        
}

function SignUp(req, res)
{  
    const Security = require('../../../Utils/Security');
    const passwordDerivatives = Security.CreatePasswordHash(req.body.password);
    User.findOne({email:req.body.email})
    .then(result=>{return result})
    .then(result => { if (!result){ return new User(
        {
            name: req.body.name, 
            email: req.body.email,
            passwordHash: passwordDerivatives[0],
            signature: passwordDerivatives[1] , 
            isAdmin: false
        }).save(); } else{res.redirect('/SignUp')}})
    .then(result => {res.redirect('/User'); console.log(result);}).catch(err=>console.log(err));
}

module.exports = 
{
    login:Login,
    signup:SignUp
}