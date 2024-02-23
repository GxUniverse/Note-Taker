const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// home page
const indexPath = path.join(__dirname, 'public', 'index.html');


app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

// notes page
const notesPath = path.join(__dirname, 'public', 'notes.html');


app.get('/notes', (req, res) => {
  res.sendFile(notesPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const dbFilePath = path.join(__dirname, 'db', 'notes.json');


app.get('/api/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});


app.post('/api/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        // Generate unique ID
        newNote.id = Date.now().toString(); 
        notes.push(newNote);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// delete a note
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json({ msg: 'Note deleted successfully' });
        });
    });
});
