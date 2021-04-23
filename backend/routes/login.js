var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log(req.query)
    // let regdata = new RegData(req.query);
    // regdata.save(function (err){ 
    //     if (err){
    //         console.log(err) 
    //         res.status(500).send({message: "reg, DB add error"})
    //     }})

    //check database contents
    // RegData.find(function(err, items){
    //     if(err) {
    //         return console.error(err)
    //     }
    //         let reply = JSON.stringify(items)
    //     console.log(reply)
    // })

    res.status(200).send({message: "Userdata added to DB"})
})

module.exports = router