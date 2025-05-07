const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'  },
    url: { type: String, required: true },
    scrapedAt: { type: Date, default: Date.now },
    data: { type: Object, required: true } 
});

module.exports = mongoose.model('Scrape', scrapeSchema);
