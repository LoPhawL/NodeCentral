module.exports = (req,res,next)=> 
{
  if( req.session.isLoggedIn == false ||  req.session.mode == 'user')
  {
    res.redirect('/Logout');
  }
  else{next();}
};