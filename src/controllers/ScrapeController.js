const runPythonScript = require('../config/runPython');
const Scrape = require('../models/ScrapeModel');

const postScrape = async (req, res) => {
    try {
        const { url, targets } = req.body;
        const userId = req.user?._id || "demoUser"; 

        if (!url || !targets || !Array.isArray(targets)) {
            return res.status(400).json({ error: 'URL and targets are required' });
        }

        const scrapedData = await runPythonScript(url, targets);

        const saved = await Scrape.create({
            userId,
            url,
            data: scrapedData
        });

        res.status(201).json(saved);
    } 
    catch (err) {
        console.error('Scrape error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const getAllScrapes = async (req, res) => {
    try {
        const userId = req.user?._id || "demoUser";  // auth-safe
        const scrapes = await Scrape.find({ userId }).sort({ scrapedAt: -1 });
        res.status(200).json(scrapes);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {getAllScrapes, postScrape};