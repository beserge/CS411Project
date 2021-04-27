var mongoose = require('mongoose')
var StravaData = mongoose.model('StravaData');

//does the initial authorization and stores the token in mongo
//this is where OAuth should return to initially
module.exports.stravaOAuth = function(req, res, next){
    let stravadata = new StravaData()
    stravadata.authToken = req.query.code
    stravadata.scope = req.query.scope
    
    stravadata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "err: authcode write"})
        }})

    res.redirect("http://localhost:4200/reg") //exchange authcode for tokens
}