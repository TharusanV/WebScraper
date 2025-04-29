const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/ScrapeController');

router.post('/', scrapeController.postScrape);
router.get('/', scrapeController.getAllScrapes);

module.exports = router;
