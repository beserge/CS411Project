var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256'],
})

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

//get all registered users (debug)
router.get('/reg', ctrlAuth.getreg)

//health registration data
router.post('/healthreg', regRouter.healthregpost)
router.get('/healthreg', auth, regRouter.healthregget)

//meal
router.post('/meal', auth, mealRouter.mealpost)
router.get('/meal', auth, mealRouter.mealget)

//calorie ninja api
router.get('/cntext', cn.text)

//fitness
router.post('/fitness', auth, fitRouter.fitpost)
router.get('/fitness', auth, fitRouter.fitget)
router.delete('/fitness', auth, fitRouter.fitdelete)

module.exports = router;
