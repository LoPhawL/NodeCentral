const express = require('express');
const bodyParser = require('body-parser')

const views = [
                'Modules/Admin/Views','Modules/EndUser/Views',
                'Modules/Common/Views/404','Modules/Common/Views/Header', 
                'Modules/Common/Views/ProductList', 'Modules/Common/Views/AddToCart'
              ]

const app = express();

app.set('endUser',null);
app.set('admin',null);
module.exports = app;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));

app.set("view engine", "ejs");
app.set('views', views);


const db = require('./Utils/Database');
db.startClient(()=>
{
  const User = require('./Modules/Common/Models/User').user;
  User.Login('ad@a.com','123456')
  .then(adRes =>
    {
      app.set('admin',adRes._id);
      User.Login('us1@a.com','123456').then(usRes =>
        {
          app.set('endUser',usRes._id);
          app.use('/Admin',require('./Modules/Admin/Routes/AdminRoutes.js')); // Admin routes
          app.use('/User',require('./Modules/EndUser/Routes/EnduserRoutes.js')); // EndUser routes
          //404 page and / (redirected to Home)
          app.use((request, response, next) => {
            if (request.originalUrl != "/")  //wrong route
            {
              response.status(404).render('404',{module:'root',page:'404'});
            }
            else //empty route
            { 
              response.redirect("/User/Products");
            }
          });
          app.listen(2000); 
          console.log('Started');
        }).catch(err => console.log('user login error',err));
    })
  .catch(err=>{console.log('admin login error',err);});
});
  