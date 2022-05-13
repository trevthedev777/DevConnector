const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Endpoint
app.get('/', (req, res) => res.send('API Running'));

// Used for Heroku or locally on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));