const express = require('express');
const router = express.Router();
const Answer = require('../../models/Answers');
const cors = require('cors');
const axios = require('axios');

router.get('/',(req, res) => {
    const user = req.body.user;
    Answer.find({userId: user})
        .then(answers => {
        res.json(answers)
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/events', async(req,res)=>{
    if(req.body.type === "ANSWER CREATED"){
        let newanswer = new Answer(req.body.newAnswer);
        newanswer.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }

})
module.exports = router;
