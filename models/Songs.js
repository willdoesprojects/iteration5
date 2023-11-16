const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },

    artist: {
        type: String
    },

    songLoco: {
        type: String
    },

    imageLoco: {
        type: String
    },
})

module.exports = mongoose.model("songs", userSchema)