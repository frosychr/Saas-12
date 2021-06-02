const express = require('express');
const router = express.Router();
const Quest = require('../../models/Questions');
const Ans = require('../../models/Answers');
const cors = require('cors');
const axios = require('axios');

// @route GET api/perday
// @desc  Show number of questions perday
// @access Private

router.get('/', async (req, res) => {
    const quest_ans = await Promise.all([
        Quest.aggregate([
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount": {"$sum": "$count"},
                    "hourlyData": {"$push": {"hour": "$_id.hour", "count": "$count"}}
                }
            }
        ]),
        Ans.aggregate([
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date" }
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount": {"$sum": "$count"},
                    "hourlyData": {"$push": {"hour": "$_id.hour", "count": "$count"}}
                }
            }
        ])

    ])
    res.json(quest_ans);

});





router.post('/events', async(req,res)=>{
    if(req.body.type == "POST CREATED"){
        let newQuestion = new Quest(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }

    if(req.body.type == "ANSWER CREATED"){
        let newAnswer = new Ans(req.body.newAnswer);
        newAnswer.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }
})

module.exports = router;