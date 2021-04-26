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
var regRouter = require('./healthReg')
var fitRouter = require('./fitness')

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/reg', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//health registration data
router.post('/healthreg', regRouter.healthregpost)
router.get('/healthreg', regRouter.healthregget)

//meal
router.post('/meal', auth, mealRouter.mealpost);

//calorie ninja api
router.get('/cntext', cn.text)

//fitness
router.get('/fitness', auth, fitRouter.fitget)

module.exports = router;
