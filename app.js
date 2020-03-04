const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const authController = require('./Modules/Common/Controllers/AuthenticationController');
const mongoSessionConnect = require('connect-mongodb-session')(session);

const MongoSessionStore = new mongoSessionConnect(
  {
    uri:"mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/ManeOose",
    collection:"Session"
  });

const views = [
                'Modules/Admin/Views','Modules/EndUser/Views',
                'Modules/Common/Views/404','Modules/Common/Views/Header', 
                'Modules/Common/Views/ProductList', 'Modules/Common/Views/AddToCart'
              ]
const app = express();

app.set("view engine", "ejs");
app.set('views', views);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));
app.use(session({secret:"1qaz", saveUninitialized:false, resave:false, store:MongoSessionStore}));

app.post('/Login', (request, response, next) => 
{
  Login(request, response);
});

app.get('/Logout',(request, response, next) => 
{
  request.session.destroy( ()=>response.redirect('/User/Products'));
});

app.use((request, response, next) => 
{
  console.log(request.session.isLoggedIn , request.session.userId); next();
});


app.use('/Admin',require('./Modules/Admin/Routes/AdminRoutes.js')); // Admin routes
app.use('/User',require('./Modules/EndUser/Routes/EnduserRoutes.js')); // EndUser routes
app.use((request, response, next) => {
            if (request.originalUrl != "/")  //wrong route
            { response.status(404).render('404',{module:'root',page:'404'}); }
            else //empty route
            { response.redirect("/User/Products"); }
          });

function Login(request, response)
{
  const  modeConfig =  Math.round( Math.random()*10 );
  authController.login(modeConfig).
  then(adRes => 
    {
      if (modeConfig % 2 == 0)
      {
        request.session.isLoggedIn = true;
        request.session.mode = 'admin'
        request.session.userId = adRes._id;
      }
      else
      {
        request.session.isLoggedIn = true;
        request.session.mode = 'user'
        request.session.userId = adRes._id;
      }
      request.session.save((err)=>{
        if(request.session.mode == 'admin')
        {
          response.redirect('./Admin/Products');
        }
        else
        {
          response.redirect('./User/products');
        }
    });
      
    })
  .catch(err=> console.log('login error',err)); ;
}

mongoose.connect('mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/ManeOose?retryWrites=true&w=majority')
.then((result)=> 
{  
  app.listen(2000); 
  console.log('Started');
} )
.catch(err=> console.log(err));