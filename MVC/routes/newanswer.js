const express = require('express');
const router = express.Router();

const newanswerController = require('../controllers/newanswer');

// /add a new answer
router.get('/',newanswerController.getnewans );

router.post('/',newanswerController.postnewans);

module.exports = router;
