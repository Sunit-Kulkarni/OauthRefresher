const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('you are logged in. This is your profile: ' + req.user.username);
});

module.exports = router;
