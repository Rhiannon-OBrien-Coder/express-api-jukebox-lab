const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

//routes/controller functions

//Create - POST - /tracks
router.post('/', async (req, res) => {
    try {
        const createTrack = await Track.create(req.body)
        res.status(201).send(createTrack)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//Read - GET - /tracks
router.get('/', async (req, res) => {
    try {
        const foundTracks = await Track.find()
        res.status(200).send(foundTracks)
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

router.get('/:trackId', async (req, res) => {
    try {
      const foundTrack = await Track.findById(req.params.trackId);
      if (!foundTrack) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).send(foundTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.send({ error: error.message });
      } else {
        res.status(500).send({ error: error.message });
      }
    }
  });

  router.delete('/:trackId', async (req, res) => {
    try {
        const deleted = await Track.findByIdAndDelete(req.params.trackId)
        if (!deleted) {
            throw new Error("Track not found")
        }
        return res.status(200).send("Track deleted")
    } catch (error) {
        return res.status(500).send(error.message);
    }
  });

  router.put('/:trackId', async (req, res) => {
    try {
      const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {
        new: true,
      });
      if (!updatedTrack) {
        res.status(404);
        throw new Error( 'Track not found.');
      }
      res.status(200).send(updatedTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.send({ error: error.message });
      } else {
        res.status(500).send({ error: error.message });
      }
    }
  });

module.exports = router