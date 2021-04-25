var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['RS256']
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var mealRouter = require('../routes/meal')
var cn = require('./cntext')

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//meal
router.post('/meal', auth, mealRouter.mealpost);

//calorie ninja api
router.get('/cntext', cn.text)

module.exports = router;
