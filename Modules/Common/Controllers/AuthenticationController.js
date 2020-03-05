const User = require('../Models/User');
const Security = require('../../../Utils/Security');

function Login(request, response)
{
    const User = require('../Models/User');
    User.findOne(  {email:request.body.email} )
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
        }).
        then(user => 
          {
            if (user)
            {
              request.session.isLoggedIn = true;
              request.session.userId = user._id;
              if(user.isAdmin)
              {
                request.session.mode = 'admin'
              }
              else
              {
                request.session.mode = 'user'
              }
              request.session.save((err)=>
              {
                if(request.session.mode == 'admin')
                {
                  response.redirect('/Admin/Products');
                }
                else
                {
                  response.redirect('/User/products');
                }
              });
            }
            else
            {
              response.redirect('/User')
            }           
          })
        .catch(err=> console.log('login error',err));        
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