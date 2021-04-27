var mongoose = require('mongoose')
var StravaData = mongoose.model('StravaData');

//does the initial authorization and stores the token in mongo
//this is where OAuth should return to initially
module.exports.stravaOAuth = function(req, res, next){
}