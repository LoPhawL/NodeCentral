const authController = require('../Controllers/AuthenticationController');
const router = require('express').Router();

router.get('/Signup', (request, response, next) => 
{
  response.render('SignUp');
});

router.post('/Signup', (request, response, next) => 
{
  authController.signup(request, response);
});

router.post('/Login', (request, response, next) => 
{
    authController.login(request, response);// Login(request, response);
});

router.get('/Logout',(request, response, next) => 
{
  request.session.destroy( ()=>response.redirect('/User/Products'));
});

module.exports = router;