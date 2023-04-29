function signupValidation(information) {
  return(
    information.email !== information['confirm-email'] || 
    information.password.trim() < 6 || 
    isEmpty(information.username) ||
    isEmpty(information.street) || 
    isEmpty(information.postalCode) || 
    isEmpty(information.city)||
    isEmpty(information.email) || 
    isEmpty(information['confirm-email']) ||
    isEmpty(information.password)
  );
};

function loginValidation(comparedPasswords) {
  return ( 
    !comparedPasswords
  )
}

function isEmpty(value) {
  return (
    !value ||
    value.trim() === ''
  )
}

module.exports = {
  signupValidation:signupValidation,
  loginValidation:loginValidation
}