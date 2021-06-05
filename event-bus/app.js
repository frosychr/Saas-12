const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const auth = require('./middleware/auth');
const Question = require('./models/Question');
const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.json());

// Init Middleware
app.use(express.json());
connectDB();

app.post('/events',(req,res) => {
    const event = req.body;
    // Create Question
    config_CREATE_QUESTION ={
        method:'post',
        url:'http://localhost:4001/api/question/events',
        data : event,
       //headers :  { "x-auth-token": req.header("x-auth-token") }
    }

    // Create Answer
    config_CREATE_ANSWER ={
        method:'post',
        url:'http://localhost:4002/api/answer/events',
        data : event,
        //headers :  { "x-auth-token": req.header("x-auth-token") }
    }
    // Create Question per Keyword
    config_CREATE_QUESTION_PER_KEYWORD ={
        method:'post',
        url:'http://localhost:4004/api/perkeyword/events',
        data : event,
        //headers :  { "x-auth-token": req.header("x-auth-token") }
    }

    config_CREATE_QUESTION_STATS ={
        method:'post',
        url:'http://localhost:4003/api/perday/events',
        data : event
    }

    config_CREATE_QUESTION_USER ={
        method:'post',
        url:'http://localhost:4006/api/questions/events',
        data : event
    }

    config_CREATE_ANSWER_USER ={
        method:'post',
        url:'http://localhost:4006/api/answers/events',
        data : event
    }

    const createQuestion = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION)
            .then(result => {
                return res.json({})
            })
            .catch(err => {

                return res.status(500)
            })

    })

    const createAnswer = new Promise((resolve,reject) => {
        axios(config_CREATE_ANSWER)
            .then(result => {
                return res.json({})
            })
            .catch(err => {
                return res.status(500)
            })

    })
    const createQuestionPerKeyword = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION_PER_KEYWORD)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json()
            })
    })

    const createQuestionPerDay = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION_STATS)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json()
            })

    })

    const createQuestionUser = new Promise((resolve,reject)=>{
        axios(config_CREATE_QUESTION_USER)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json();
            })

    })

    const createAnswerUser = new Promise((resolve,reject)=> {
        axios(config_CREATE_ANSWER_USER)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json();
            })
    })


Promise.all([createAnswer,createQuestion,createQuestionPerKeyword,createQuestionPerDay,createQuestionUser,createAnswerUser]).then((values) => {
    console.log(values);
})
    .catch(err => {
        return res.status(500)
    })
})

app.listen(4005, () => {
    console.log('Listening at port 4005...')
})

