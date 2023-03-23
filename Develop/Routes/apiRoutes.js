const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const noteData = require('../db/db.json');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
  fs.readFile('Develop/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    }
  });
});

router.post('/notes', (req, res) => {
 
  console.info(`${req.method} request received to add a review`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uniqid(),
      title,
      text,
    };

    fs.readFile('Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          'Develop/db/db.json',
          JSON.stringify(parsedNotes), 
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
        console.log(parsedNotes);
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