var mongoose = require( 'mongoose' );

const StravaSchema = new mongoose.Schema({
    authToken: String,
});

mongoose.model('StravaData', StravaSchema)