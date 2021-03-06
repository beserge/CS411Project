var mongoose = require('mongoose')
var StravaData = mongoose.model('StravaData');
var WorkoutData = mongoose.model('WorkoutData')
var UserData = mongoose.model('User')
var MealData = mongoose.model('MealData')
var RegData = mongoose.model('RegData')
var moment = require('moment')
var axios = require('axios');

//send a new workout to strava
module.exports.stravaWorkoutPost = function(user_id, workoutdata){
    //check strava tokens are still ok for user
    if(tokenCheck(user_id)){
        //get strava tokens
        StravaData.findOne({userid: user_id}).exec(function(err, stravaitem){
            if(err){
                console.log('error', err)
                return
            }
            else{
                //call the api            
                var config = {
                    method: 'post',
                    
                    url:'https://www.strava.com/api/v3/activities?' + 
                    'name=' + '4PIF1T' +
                    '&type=' + (workoutdata.isRunning ? 'Run' : '') + 
                    (workoutdata.isCycling ? 'Ride' : '') +
                    '&elapsed_time=' + (workoutdata.duration * 60) + //min->sec
                    '&start_date_local=' + //ISO8601 time
                    workoutdata.year + '-' + 
                    workoutdata.month + '-' +
                    workoutdata.day + '-' +
                    'T' + workoutdata.time + ':00Z',

                    headers:{
                        'Authorization': 'Bearer ' + stravaitem.access_token
                    }
                }

                axios(config)
                .then(function (response) {
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.error(error);
                });

            }
        })
    }
    else{
        console.log('token error')
    }
}

//check tokens and refresh them if necessary
let tokenCheck = function(_id){
    console.log(_id)
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
    //StravaData.find({userid: req.payload._id}).exec(function(err, items){
    StravaData.find().exec(function(err, items){
        if(err){
            console.err(err)
        }
        res.status(200).json(items)
    })

    UserData.find({_id: req.payload.id}).exec(function(err, item){
        console.log('err: ', err)
        console.log('item: ', item)
    })
}

module.exports.thenuclearoption = function(req, res, next){
    StravaData.deleteMany({}, function(){})
    WorkoutData.deleteMany({}, function(){})
    UserData.deleteMany({}, function(){})
    MealData.deleteMany({}, function(){})
    RegData.deleteMany({}, function(){})
    res.status(200).json({message: "I am become debug, destroyer of databases"})
}