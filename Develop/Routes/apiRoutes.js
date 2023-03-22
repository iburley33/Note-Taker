const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const noteData = require('../db/db.json');

router.get('/api/notes', (req, res) => {
    res.json(noteData);
});

router.post('/api/notes', (req, res) => {
 
  console.info(`${req.method} request received to add a review`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),   // clarify this number 4 with TA
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});




router.delete('/api/notes/:id', (req, res) => {
    
});

module.exports = router;