const app = require('express').Router()
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html")); //homeroute index.html
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html")); //get notes.html
  });
  

  module.exports = app;