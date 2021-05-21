const express = require('express');
const router = express.Router();

const mycontrib = require('../controllers/mycontrib');

// /questions per keyword => GET
router.get('/mycontrib',mycontrib.getmycontrib );

module.exports = router;
