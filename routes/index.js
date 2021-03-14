const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Notes = require('../models/notes');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/api/notes', async (req, res, next) => {
  Notes.find(req.query)
    .collation({
      locale: 'en',
      strength: 2,
    })
    .then((note) => {
      try {
        // console.log(note);
        res.status(200);
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(note, null, 2));
      } catch (err) {
        next(err);
      }
    });
});

router.post('/api/notes', (req, res, next) => {
  // console.log(req.body);
  Notes.create(req.body).then((note) => {
    try {
      // console.log(note);
      res.status(200);
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(note, null, 2));
    } catch (err) {
      next(err);
    }
  });
});

router.delete('/api/notes/:noteId', (req, res, next) => {
  Notes.findByIdAndRemove(req.params.noteId).then((resp) => {
    try {
      // console.log(resp);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resp, null, 2));
    } catch (err) {
      next(err);
    }
  });
});

router.put('/api/notes/:noteId', (req, res, next) => {
  Notes.findByIdAndUpdate(
    req.params.noteId,
    { $set: req.body },
    { new: true }
  ).then((note) => {
    try {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(note, null, 2));
    } catch (err) {
      next(err);
    }
  });
});

module.exports = router;
