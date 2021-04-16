var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + req.query.searchString
        ,
        headers: {
            'X-Api-Key': 'TeOcj/yCANdO+qeCVv12hQ==uJhhBnWKu8IySHk2'
        }
    };

    axios(config)
        .then(function (response) {
            let reply = JSON.stringify(response.data)
            res.send(reply);
        })
        .catch(function (error) {
            console.log(error);
            res.sendStatus(500)
        });
});

module.exports = router;