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

      //check if user already exists in database
      User.findOne({ googleID: profile.id }).then(currentUser => {
        if (currentUser) {
          //already have the user
          console.log('user is: ' + currentUser);
        } else {
          //if not, create new user in our db
          new User({
            username: profile.displayName,
            googleID: profile.id
          })
            .save()
            .then(newUser => {
              console.log('new user created: ' + newUser);
            });
        }
      });
    }
  )
);
