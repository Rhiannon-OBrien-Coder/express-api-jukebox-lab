const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  })
  
  const Song = mongoose.model('Song', songSchema)
  module.exports = Song