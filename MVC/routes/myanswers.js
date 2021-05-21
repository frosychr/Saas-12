const express = require('express');
const router = express.Router();

const myanswers = require('../controllers/myanswers');

// /questions per keyword => GET
router.get('/myanswers',myanswers.getmyanswers);

module.exports = router;
