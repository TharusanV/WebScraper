const express = require("express");
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

//Create the app
const app = express();

// Connect Database
connectDB();

//Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

//Routes
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
