const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys/dev');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id); //passing in MONGO id, not googleID; if error pass null
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
          done(null, currentUser);
        } else {
          //if not, create new user in our db
          new User({
            username: profile.displayName,
            googleID: profile.id,
            thumbnail: profile._json.image.url
          })
            .save()
            .then(newUser => {
              console.log('new user created: ' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
