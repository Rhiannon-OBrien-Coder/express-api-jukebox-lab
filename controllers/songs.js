const Song = require('../models/song.js')
const express = require('express')
const router = express.Router()

//routes/controller functions

//Create - POST - /songs
router.post('/', async (req, res) => {
    try {
        const createdSong = await Song.create(req.body)
        res.status(201).send(createdSong)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//Read - GET - /songs
router.get('/', async (req, res) => {
    try {
        const foundSongs = await Song.find()
        res.status(200).send(foundSongs)
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

router.get('/:songId', async (req, res) => {
    try {
      const foundSong = await Song.findById(req.params.songId);
      if (!foundSong) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).json(foundSong);
    } catch (error) {
      if (res.statusCode === 404) {
        res.send({ error: error.message });
      } else {
        res.status(500).send({ error: error.message });
      }
    }
  });

  router.delete('/:songId', async (req, res) => {
    try {
        const deleted = await Song.findByIdAndDelete(req.params.songId)
        if (!deleted) {
            throw new Error("Song not found");
        }
        return res.status(200).send("Song deleted");
    } catch (error) {
        return res.status(500).send(error.message);
    }
  });

  router.put('/:songId', async (req, res) => {
    try {
      const updatedSong = await Song.findByIdAndUpdate(req.params.songId, req.body, {
        new: true,
      });
      if (!updatedSong) {
        res.status(404);
        throw new Error('Song not found.');
      }
      res.status(200).json(updatedSong);
    } catch (error) {
      if (res.statusCode === 404) {
        res.send({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

module.exports = router
