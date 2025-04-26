const express = require('express');
const port = 3000;
const app = express();


app.use(express.json()); // Allow server to parse JSON data

//GET HTTP Requests
app.get('/api/get-data', (req, res) => {
    const dataToSend = { greeting: "Hello from Node.js backend!" };
    
    res.json(dataToSend);
});



app.listen(port, () => {
    console.log('Server is listening on http://localhost:3000');
});
