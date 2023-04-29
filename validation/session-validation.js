function signUpError(req,data,message,action) {
  req.session.userData = {
    hasError:true,
    message:message,
    ...data //email , confirmEmail, password, username, street, postalCode, city
  }

  req.session.save(action)

}


function loginError(req,data,message,action) {
  req.session.userData = {
    hasError:true,
    message:message,
    ...data
  }

  req.session.save(action);
}

function noError() {
  return {
    email:'',
    confirmEmail:'',
    username:'',
    street:'',
    postalCode:'',
    city:'',
    hasError:false,
  }
};

module.exports = {
  signUpError:signUpError,
  loginError:loginError,
  noError:noError
}