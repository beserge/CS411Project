module.exports = function cnTextHandler(req, res){
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
            let items = response.data.items
            let reply = ""

            items.forEach(function (item){
                reply += "<h1>" + JSON.parse(JSON.stringify(item.name)) + "</h1>"
                reply += "<p>Calories: " + JSON.parse(JSON.stringify(item.calories)) + "</p>"
                reply += "<p>Total Fat g:" + JSON.parse(JSON.stringify(item.fat_total_g)) + "</p>"
                reply += "<p>Serving Size g: " + JSON.parse(JSON.stringify(item.serving_size_g)) + "</p>"
            });

            res.send(reply);
        })
        .catch(function (error) {
            console.log(error);
        });
}