var mongoose = require('mongoose')
var StravaData = mongoose.model('StravaData');

module.exports.unix = function(){
    console.log(moment().unix())
}

//strava reroutes to us here
//we need to move some data around before we jump to auth
module.exports.stravaReroute = function(req, res, next){
    req.headers = { 'authorization': 'Bearer ' + req.query.token }
    console.log(req.headers)
    console.log('reroute: token', req.query.token)
    next()
}

//does the initial authorization and stores the token in mongo
module.exports.stravaOAuth = function(req, res, next){
    let stravadata = new StravaData()
    stravadata.authToken = req.query.code
    stravadata.scope = req.query.scope
    stravadata.userid = req.payload._id

    //token exchange, get the first refresh token, etc.
    var axios = require('axios');

    const params = new URLSearchParams()
    params.append('client_id', '64966')
    params.append('client_secret', '0b2d7631fe1297b0ba9f2b08893d5e2f6af6bcad')
    params.append('code', req.query.code)
    params.append('grant_type', 'authorization_code')

    let url = 'https://www.strava.com/api/v3/oauth/token'
    var config = {};

    axios.post(url, params, config)
        .then(function (response) {
            stravadata.expires_at = response.data.expires_at
            stravadata.refresh_token = response.data.refresh_token
            stravadata.access_token = response.data.access_token
            stravadata.athlete = response.data.athlete
            console.log(stravadata)
 
            stravadata.save(function (err){ 
                if (err){
                    console.log(err) 
                    res.status(500).send({message: "err: strava data write"})
                }
                else{
                    res.redirect("http://localhost:4200/dashboard") //exchange authcode for tokens
                }
            })        
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send({message: "err: token exchange"})
        });
}

//DEBUG ONLY REMOVE!!!!!!
module.exports.stravaget = function(req, res, next){
    StravaData.find(function(err, items){
        if(err){
            console.err(err)
        }
        res.status(200).json(items)
    })
}