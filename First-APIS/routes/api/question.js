const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Question = require('../../models/Question');
const User = require('../../models/User');

// @route POST api/question
// @desc  Create a question
// @access Private

router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is  required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newQuestion = new Question({
                title: req.body.title,
                text: req.body.text,
                keywords: req.body.keywords,
                name: user.name,
                user: req.user.id,
            });
            const question = await newQuestion.save();
            res.json(question);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route GET api/question
// @desc  Get ALL questions
// @access Private

router.get('/',
    [
        auth,
        [
            check('text', 'Text is  required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
    try {
        const quest = await Question.find().sort({ date: -1 });
        res.json(quest);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/question
// @desc  Get 10 questions as visitor
// @access Public

router.get('/visitor',

    async (req, res) => {
        try {
            const limit = 1;
            const quest = await Question.find().sort({ date: -1 }).limit(limit);
            res.json(quest);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

// @route GET api/question/:keywords
// @desc  Get question by keywords
// @access Private

router.get('/:keywords',
    [
        auth,
        [
            check('text', 'Text is  required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
    try {
        const quest = await Question.find({keywords:req.params.keywords});
        if(!quest){
            return res.status(404).json({msg: 'Question not found'})
        }
        res.json(quest);
    } catch (error) {

        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/question/answer/:id
// @desc    Answer a question
// @access  Private
router.post(
    '/answer/:id',
    [
        auth,
        [
            check('text', 'Text is  required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const quest = await Question.findById(req.params.id);
            const newAnswer = {
                text: req.body.text,
                name: user.name,
                user: req.user.id,
            };
            quest.Answers.unshift(newAnswer);
            await quest.save();
            res.json(quest.Answers);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


module.exports = router;