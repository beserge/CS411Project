var mongoose = require( 'mongoose' );

var RegSchema = new mongoose.Schema({
        height: Number,
        weight: Number,
        gender: String,
        goalLbs: Number,
        timeDays: Number,
		carbs: Number,
		fats: Number,
		protein: Number,
		isKosher: Boolean,
		isHalal: Boolean,
		isVegetarian: Boolean,
		isVegan: Boolean,	
		sunday: Boolean,
		monday: Boolean,
		tuesday: Boolean,
		wednesday: Boolean,
		thursday: Boolean,
		friday: Boolean,
		saturday: Boolean,
        workoutTimes: Number, //preferred time in min since midnight
		indoor: Boolean,
		outdoor: Boolean,
		cycling: Boolean,
		running: Boolean,
});

mongoose.model('RegData', RegSchema);
