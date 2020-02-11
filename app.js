const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));

app.use('/Admin',require('./Modules/Admin/Routes/AdminRoutes.js')); // Admin routes
app.use('/User',require('./Modules/EndUser/Routes/EnduserRoutes.js')); // EndUser routes

app.set("view engine", "ejs");
app.set('views', ['Modules/Admin/Views','Modules/EndUser/Views','Modules/Common/404/Views','Modules/Common/Header/Views']);

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