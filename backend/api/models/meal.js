var mongoose = require( 'mongoose' );

const MealSchema = new mongoose.Schema({
    sugar_g: Number,
    fiber_g: Number,
    serving_size_g: Number,
    sodium_mg: Number,
    name: String,
    potassium_mg: Number,
    fat_saturated_g: Number,
    fat_total_g: Number,
    calories: Number,
    cholesterol_mg: Number,
    protein_g: Number,
    carbohydrates_total_g: Number,
});

let MealData = mongoose.model('MealData', MealSchema)
