var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
const { Schema } = mongoose
const WorkoutSchema = new Schema({
    time: String,
    day: Number,
    month: Number,
    year: Number,
    isCycling: Boolean,
    isRunning: Boolean,
    isIndoor: Boolean,
    isOutdoor: Boolean,
    calories: Number,
    duration: Number, //minutes
    completed: Boolean,
});

let WorkoutData = mongoose.model('WorkoutData', WorkoutSchema)

//add new workout
router.post('/', function(req, res, next) {
    console.log(req.query)
    let workoutdata = new WorkoutData(req.query);

    //defaults
    workoutdata.completed = false

    workoutdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "workout, DB add error"})
            return
        }})

    res.status(200).send({message: "Workout added to DB"})
})

//get all workout data
//TODO just get data for one user
router.get('/', function(req, res, next) {
    WorkoutData.find(function(err, items){
        if(err) {
            console.log(err)
            res.status(500).send({message: "get error, workout"})
            return
        }
        let reply = JSON.stringify(items)
        console.log(reply)
        res.send(reply)
    })
})

//delete workout by id
//TODO confirm user owns that workout
router.delete('/', function(req, res, next) {
    let deldata = WorkoutData.deleteMany({"_id": req.query.id}, function (err, result) {
      if(err){ 
          console.log(err)
          res.status(500).send({message: "delete error, workout"})
          return
      }
      else if(result.deletedCount < 1){
        res.status(500).send({message: "Couldn't find ID, workout delete"})
        return
      }
      else{
        res.status(200).send({message: "Workout removed from DB"})
      }
    })
})
module.exports = router