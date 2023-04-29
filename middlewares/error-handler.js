function handleErrors(error, req,res,next) {


  if (error.code === 404) {
    res.status(404).render('shared/404');
  } 


  res.status(500).render('shared/500');
}

module.exports = handleErrors;