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
        headers :  { "x-auth-token": req.header("x-auth-token") }
    }

    axios(config_CREATE_QUESTION)
        .then(result => {
            let newQuestion = new Question(req.body.newQuestion);
            newQuestion.save()
        })
        .catch(err => {
            return res.status(500)
        })

    // Create Answer
    config_CREATE_ANSWER ={
        method:'post',
        url:'http://localhost:4002/api/answer/events',
        data : event,
        headers :  { "x-auth-token": req.header("x-auth-token") }
    }
    axios(config_CREATE_ANSWER)
        .then(result => {
            return res.json({})
        })
        .catch(err => {
            return res.status(500).json({})
        })

    config_CREATE_QUESTION_STATS ={
        method:'post',
        url:'http://localhost:4003/api/perday/events',
        data : event
    }
    axios(config_CREATE_QUESTION_STATS)
        .then(result => {
            return res.json({})
        })
        .catch(err => {
            return res.status(500)
        })
})

/*app.get('/events', (req,res) => {
    res.send(events);
})*/
app.listen(4005, () => {
    console.log('Listening at port 4005...')
})