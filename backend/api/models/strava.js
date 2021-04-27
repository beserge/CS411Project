var mongoose = require( 'mongoose' );

const StravaSchema = new mongoose.Schema({
    authToken: String,
    scope: String, //todo figure out the type
});

mongoose.model('StravaData', StravaSchema)