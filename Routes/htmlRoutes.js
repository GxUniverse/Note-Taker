const app = require('express').Router();
const path = require('path');

// Serve the index.html file for the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Serve the notes.html file for a specific route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = app;