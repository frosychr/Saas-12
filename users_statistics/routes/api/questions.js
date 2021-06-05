const express = require('express');
const router = express.Router();
const Question = require('../../models/Questions');
const cors = require('cors');
const axios = require('axios');

router.get('/',(req, res) => {
        const user = req.body.user;
        console.log(user);
        Question.find({userId:user})
        .then(questions => {
            res.json(questions);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/events', async(req,res)=>{
    if(req.body.type === "POST CREATED"){
        let newQuestion = new Question(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                console.log("Question was Created")
                return res.status(201).json({})
            })
            .catch(err =>{
                console.log("Error in saving question")
                return res.status(401).json({})
            })
    }

})

module.exports = router;
