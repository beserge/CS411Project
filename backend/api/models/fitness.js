var mongoose = require( 'mongoose' );

const WorkoutSchema = new mongoose.Schema({
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