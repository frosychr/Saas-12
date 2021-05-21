const express = require('express');
const router = express.Router();

const myquestions = require('../controllers/myquestions');

// /questions per keyword => GET
router.get('/myquestions',myquestions.getmyquestions );

module.exports = router;
