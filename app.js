const express = require('express');
const bodyParser = require('body-parser')
const Product = require('./Modules/Common/Models/Product.js');
const Cart = require('./Modules/EndUser/Models/Cart').cart;

const views = [
                'Modules/Admin/Views','Modules/EndUser/Views',
                'Modules/Common/Views/404','Modules/Common/Views/Header', 
                'Modules/Common/Views/ProductList', 'Modules/Common/Views/AddToCart'
              ]

const app = express();
app.set('cart', new Cart());
Product.GetAllProducts( data =>
  {
    app.set('products',data);
  });

module.exports = app;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Public'));

app.use('/Admin',require('./Modules/Admin/Routes/AdminRoutes.js')); // Admin routes
app.use('/User',require('./Modules/EndUser/Routes/EnduserRoutes.js')); // EndUser routes

app.set("view engine", "ejs");
app.set('views', views);

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