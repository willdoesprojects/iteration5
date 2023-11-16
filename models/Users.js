const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    favoriteSongs: {
        type: Array
    },

    favoriteDJs: {
        type: Array
    },

    queuedSongs: {
        type: Array
    },

    queuedDJs: {
        type: Array
    }
});

module.exports = mongoose.model("User", userSchema);