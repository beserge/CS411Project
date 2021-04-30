var mongoose = require('mongoose')
let WorkoutData = mongoose.model('WorkoutData')
let strava = require('./strava.js')

//add new workout
module.exports.fitpost = function(req, res, next) {
    if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
    })}
    else {
        let workoutdata = new WorkoutData(req.query);

        //defaults
        workoutdata.completed = false
        workoutdata.userid = req.payload._id

        workoutdata.save(function (err){ 
            if (err){
                console.log(err) 
                res.status(500).send({message: "workout, DB add error"})
                return
            }})

        strava.stravaWorkoutPost(req.payload._id, workoutdata)
        res.status(200).send({message: "Workout added to DB"})
    }
}

//get all workout data
//TODO just get data for one user
module.exports.fitget = function(req, res, next) {
    if (!req.payload._id) {
        res.status(401).json({"message" : "UnauthorizedError: private profile"})
        return
    }

    WorkoutData.find({userid: req.payload._id}).exec(function(err, items){
    // WorkoutData.find(function(err, items){ //finds all
        if(err) {
            console.log(err)
            res.status(500).send({message: "get error, workout"})
        }
        else{
            // console.log(items)
            res.status(200).json(items)
        }
    })
}

//delete workout by id
//TODO confirm user owns that workout
module.exports.fitdelete = function(req, res, next) {
    console.log(req.payload._id)
    if(!req.payload._id){
        res.status(401).json({"message" : "UnauthorizedError: private profile"})
        return
    }
    
    let deldata = WorkoutData.deleteMany({userid: req.payload._id}, function (err) {
      if(err){ 
          console.log(err)
          res.status(500).send({message: "delete error, workout"})
          return
      }
      else{
        res.status(200).send({message: "Workout(s) removed from DB"})
      }
    })
}