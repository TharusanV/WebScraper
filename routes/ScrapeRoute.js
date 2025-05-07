const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/ScrapeController');
const verifyToken = require('../config/authMiddleware');

router.post('/', verifyToken, scrapeController.postScrape);
router.get('/', verifyToken, scrapeController.getAllScrapes); 

module.exports = router;
