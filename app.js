const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoSessionConnect = require('connect-mongodb-session')(session);

const MongoSessionStore = new mongoSessionConnect(
  {
    uri:"mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/ManeOose",
    collection:"Session"
  });

const views = [
                'Modules/Admin/Views','Modules/EndUser/Views',
                'Modules/Common/Views/404','Modules/Common/Views/Header', 
                'Modules/Common/Views/ProductList', 'Modules/Common/Views/AddToCart',
                'Modules/Common/Views/SignUp'
              ]
const app = express();

app.set("view engine", "ejs");
app.set('views', views);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));
app.use(session({secret:"1qaz", saveUninitialized:false, resave:false, store:MongoSessionStore}));

app.use('/Auth',require('./Modules/Common/Routes/AuthRoutes')); // Admin routes

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


mongoose.connect('mongodb+srv://jas:JasJas@cluster0-fh9tz.mongodb.net/ManeOose?retryWrites=true&w=majority')
.then((result)=> 
{  
  app.listen(2000); 
  console.log('Started');
} )
.catch(err=> console.log(err));