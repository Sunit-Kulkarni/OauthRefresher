const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
  res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send('logging out');
});

//auth with google - goes to consent screen
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

//callback route for google to redirect to
router.get('/google/redirect', (req, res) => {
  res.send('reached callback URI');
});

module.exports = router;
