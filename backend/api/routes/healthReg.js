var mongoose = require('mongoose')
var RegData = mongoose.model('RegData');

module.exports.healthregpost = function(req, res){
    let regdata = new RegData(req.query);
    regdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "reg, DB add error"})
        }})
}

module.exports.healthregget = function(req, res){
    RegData.find(function(err, items){
        if(err) {
            res.status(500).send({message: "healthreg GET error"})
            return console.error(err)
        }
            let reply = JSON.stringify(items)
        console.log(reply)
        res.status(200).send(JSON.stringify(reply))
    })
}