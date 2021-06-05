const Question = require('../../models/Questions');
const Answer = require('../../models/Answers');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');

router.get('/',async (req, res) => {
    const userid = req.body.user;
    const quest_ans = await Promise.all([
        Question.aggregate([
            {
                $match: {
                    userId: userid
                }
            },
            {
                "$group":{

                    "_id":{
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count":{"$sum":1}
                }},
            {"$group":{
                    "_id":{
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount":{"$sum":"$count"},
                    "hourlyData":{"$push":{"hour":"$_id.hour","count":"$count"}}
                }}
        ]),
        Answer.aggregate([
            {
                $match: {
                    userId: userid // replace this hard-coded objectId with mongoose.Types.ObjectId(req.query.payment_order_id)
                }
            },
            {"$group":{
                    "_id":{
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count":{"$sum":1}
                }},
            {"$group":{
                    "_id":{
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount":{"$sum":"$count"},
                    "hourlyData":{"$push":{"hour":"$_id.hour","count":"$count"}}
                }}
        ])
    ])
res.json(quest_ans);
});

module.exports = router;
