const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Question = require('../../models/Question');
const jwt_decode = require('jwt-decode');

const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


// @route POST api/question
// @desc  Create a question
// @access Private


router.post(
    '/',auth, async (req,res) => {
            /*const token = req.header("x-auth-token");
            const decoded = jwt_decode(token);
            const userId = JSON.stringify(decoded.user);
            const uid = userId.substring(
                userId.lastIndexOf(":") + 1,
                userId.lastIndexOf("}")
            );
            const x = uid.substring(1);
            const telikoid = x.substring(0, x.length - 1);*/
            const id = randomBytes(4).toString('hex');
            const newQuestion = {
                quest_id: id,
                title: req.body.title,
                text: req.body.text,
                keywords: req.body.keywords,
                userId: telikoid
            };

            config = {
                method: 'post',
                url: "http://localhost:4005/events",
                headers :  { "x-auth-token": req.header("x-auth-token") },
                data : { type: "POST CREATED" , newQuestion:newQuestion}
            }
            axios(config)
                .then( (result) => {
                    return res.status(201).json({msg : "Successful Post Creation"})

                })
                .catch(err =>{
                    console.error(err)
                    return res.status(500).json({msg: "Create Question Error"})
                })

    }
);


router.post('/events', async(req,res)=>{
    if(req.body.type === "POST CREATED"){
        let newQuestion = new Question(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }
    // when an answer is created, it is saved at field Answers of Questions model
    if(req.body.type === "ANSWER CREATED"){
        const result = req.body.newAnswer.questionid;
            let save_answer = {
                text: req.body.newAnswer.text
            }
        Question.findOneAndUpdate({quest_id: result}, {$push: {Answers: save_answer}}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
         }).then(result => {
                return res.status(201).json({})
            }).catch(err =>{
                    return res.status(401).json({})
                })
    }
})



module.exports = router;