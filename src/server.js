const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const BACKENDPORT = process.env.BACKENDPORT;
const FRONTENDPORT = process.env.FRONTENDPORT;

//Create the app
const app = express();

// Connect Database
connectDB();

//Middleware
app.use(cookieParser());

app.use(cors( {origin: FRONTENDPORT, credentials: true} )); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

//Routes
const userRoutes = require('./routes/UserRoutes');
const scrapeRoutes = require('./routes/ScrapeRoute');

app.use('/api/users', userRoutes);
app.use('/api/scrapes', scrapeRoutes);

//Start the server
app.listen(BACKENDPORT, () => {
    console.log(`Server running on port ${BACKENDPORT}`);
});



/*

Frontend - Right-click index.html → "Open with Live Server".
Backend - in the terminal 'npm run dev'

*/