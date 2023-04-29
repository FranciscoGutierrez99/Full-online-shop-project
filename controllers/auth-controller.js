const User = require('../models/user-model');
const sessions = require('../validation/session-validation');
const validations = require('../validation/validation');
const createUserSession = require('../util/auth-session');



function getSignup(req,res) {
  let userData = req.session.userData;

  if (!userData) {
    userData = sessions.noError();
  }
  req.session.userData = null
  res.render('customer/auth/signup',{userData:userData});
}


async function postSignup(req,res,next) {
  const data = req.body;
  let existingUser;


  const user = new User(
    req.body.email,
    req.body.password, 
    req.body.username, 
    req.body.street, 
    req.body.postalCode, 
    req.body.city
  );

  //Check for invalid passwords or emails
  if (validations.signupValidation(data)){ 
    const message = 'Invalid input try again!';
    sessions.signUpError(req,data,message,()=> {
      return res.redirect('/signup');
    })
    return;
  }
  
  try{
    existingUser = await user.getUser();
  }
  catch(error) {
    return next(error);
  }
   

  //Check if user already exist
  if (existingUser) {
    const message = 'User already exists'
    sessions.signUpError(req,data,message,() => {
      return res.redirect('/signup');
    })
    return;
  }
  
  try {
    await user.insertUser();
  }
  catch (error) {
    return next(error);
  }
  
  res.redirect('/login');
}

function getLogin(req,res) {
  let userData = req.session.userData;

  if(!userData) {
    userData = sessions.noError()
  }
  req.session.userData = null;
  res.render('customer/auth/login',{userData:userData});
}

async function postLogin(req,res,next) {
  const information = req.body;
  const user = new User(information.email,information.password);
  let existingUser;

  try {
    existingUser = await user.getUser();
  }
  catch (error) {
    return next(error);
  }

  if(!existingUser) {
    const message = 'User does not exist!'
    sessions.loginError(req,information,message,() => {
      return res.redirect('/login');
    })
    return;
  }
  
  let comparedPasswords;
  try {
    comparedPasswords = await user.comparePassword(existingUser.password);
  }
  catch (error) {
    return next(error)
  }


  if (validations.loginValidation(comparedPasswords)) {
    const message = 'Invalid password or email check again!'
    sessions.loginError(req,information,message,() => {
      return res.redirect('/login');
    })
    return;
  }


  createUserSession.createUserSession(req,existingUser,() =>{
    res.redirect('/products');
  })
  return;
}

function logout(req,res) {
  createUserSession.destroyUserAuthSession(req);
  res.redirect('/login');
}





module.exports = {
  getSignup:getSignup,
  getLogin:getLogin,
  postSignup:postSignup,
  postLogin:postLogin,
  logout:logout,
}