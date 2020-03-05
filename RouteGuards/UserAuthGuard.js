
module.exports = (req,res,next) => 
{
  if( req.session.isLoggedIn == false || req.session.mode == 'admin')
  {
    res.redirect('/Logout');
  }
  else{next();}
}