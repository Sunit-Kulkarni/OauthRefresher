const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./keys/dev');
const cookieSession = require('cookie-session');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    //encrypt cookie for a day long
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session()); //making passport use session cookies

//connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  () => {
    console.log('connected to mongodb');
  }
);

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
