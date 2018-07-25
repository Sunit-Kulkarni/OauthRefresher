const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
});

//auth with google - goes to consent screen
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

//callback route for google to redirect to - we have a code from the url - exchanging code for profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //req.user passport does this behind the scenes in passport-setup
  //res.send(req.user);
  //send to a profile page that is nicely formatted
  res.redirect('/profile/');
});

module.exports = router;
