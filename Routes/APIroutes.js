const app = require('express').Router()
const dbFile = "./db/db.json"
 
const fs = require('fs');

app.get('/public/notes', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});


app.post('/public/notes', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        // Generate unique ID
        newNote.id = Date.now().toString(); 
        notes.push(newNote);
        fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// delete a note
app.delete('/public/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json({ msg: 'Note deleted successfully' });
        });
    });
});

//CRUD operations (manipulating data)
//Create
//Read - get data
//Update
//Delete
//res.json
module.exports = app;