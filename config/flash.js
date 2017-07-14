// setup flash info and go!
const flashGo = (req, res, message, url) =>  {
  url = (url) ? url : '/';
  req.flash('message', message);
  req.flash('form_params', req.body);
  res.redirect(url);
}

module.exports = {flashGo};