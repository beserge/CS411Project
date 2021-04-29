var mongoose = require( 'mongoose' );

const StravaSchema = new mongoose.Schema({
    authToken: String,
    scope: String,
    userid: String, //grab from query string
    expires_at: Number,
    refresh_token: String,
    access_token: String,
    athlete: Object,
});

mongoose.model('StravaData', StravaSchema)