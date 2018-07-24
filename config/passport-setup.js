const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys/dev');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // profile got from the token in url
      //passport callback function
      console.log('passport callback function fired ');
      console.log(profile);
      new User({
        username: profile.displayName,
        googleID: profile.id
      })
        .save()
        .then(newUser => {
          console.log('new user created: ' + newUser);
        });
    }
  )
);
