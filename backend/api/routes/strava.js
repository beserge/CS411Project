var mongoose = require('mongoose')
var StravaData = mongoose.model('StravaData');
var WorkoutData = mongoose.model('WorkoutData')
var UserData = mongoose.model('User')
var moment = require('moment')
var axios = require('axios');

//send a new workout to strava
//these get so dense calling mongoose like 3 times nested...
module.exports.stravaWorkoutPost = function(req, res, next){
    if (!req.payload._id) {
        res.status(401).json({"message" : "UnauthorizedError: private profile"})
        return
    }

    else if(tokenCheck(req.payload_id)){
        StravaData.findOne({userid: req.payload._id}).exec(function(err, stravaitem){
            if(err){
                console.log({message: 'strava data not found for user'})
                console.log('error', err)
                return
            }
            else{
                WorkoutData.findOne({userid: req.payload._id, _id: req.query.workout_id}).exec(function(err, workoutitem){
                    if(err){
                        console.log({message: 'workout not found with id and user id'})
                        return        
                    }
                    //call the api
                })
            }
        })
        res.status(200).json({message: 'good strava post, workout added!'})
    }
    
    else{
        res.status(500).json({"message" : "strava token error"})
    }
}

//check tokens and refresh them if necessary
let tokenCheck = function(_id){
    StravaData.find({userid: _id}).exec(function(err, items){
        if (err){
            console.log(err)
            res.status(500).json({message: "find error, strava api"})
            return false
        }
        else if(moment().unix() >= items[0].expires_at){
            return refreshTokens(_id)            
        }
    })
    return true
}

//refresh strava tokens when they expire
//wow this function is crazy
//I think it works but the tokens take 6 hours to expire so who's to say
let refreshTokens = function(_id){
    console.log('updating expired strava tokens')

    //find user's strava data
    StravaData.find({userid: _id}).exec(function(err, items){
        if (err){
            console.log(err)
            return false
        }
        
        //found expired data, call strava to get new tokens
        const params = new URLSearchParams()
        params.append('client_id', '64966')
        params.append('client_secret', '0b2d7631fe1297b0ba9f2b08893d5e2f6af6bcad')
        params.append('refresh_token', items[0].refresh_token)
        params.append('grant_type', 'refresh_token')
    
        let url = 'https://www.strava.com/api/v3/oauth/token'
        var config = {};
    
        axios.post(url, params, config)
            .then(function (response) {
                //got the new tokens, now update mongo
                newdata = {
                        expires_at: response.data.expires_at,
                        refresh_token: response.data.refresh_token,
                        access_token: response.data.access_token,
                }
        
                StravaData.updateOne({userid: _id}, newdata).exec(function (err){ 
                    if (err){
                        console.log(err) 
                        return false
                    }
                })        
            })
            .catch(function (error) {
                console.log(error);
                return false
            });
    })
    return true
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
    StravaData.find({userid: req.payload._id}).exec(function(err, items){
        if(err){
            console.err(err)
        }
        res.status(200).json(items)
    })
}