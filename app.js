const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));

app.use('/Admin',require('./Modules/Admin/Routes/AdminRoutes.js')); // Admin routes
app.use('/User',require('./Modules/EndUser/Routes/EnduserRoutes.js')); // EndUser routes

//404 page and / (redirected to Home)
app.use((request, response, next) => {
    if (request.originalUrl != "/")  //wrong route
    {
      response.status(404).render('404',{page:'404'})
    }
    else //empty route
    { 
      response.redirect("/User/Products");
    }
  });
  
  app.listen(2000);