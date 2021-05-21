const path = require('path');

const express = require('express');

const allquestionsController = require('../controllers/newquestion');

const router = express.Router();

router.get('/allquestions', allquestionsController.allquests);

module.exports = router;
