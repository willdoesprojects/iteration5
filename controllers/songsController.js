const UserModel = require("../models/Users");
const SongModel = require("../models/Songs");
const favSongsListHandler = async (req, res) => {
    const user = await UserModel.findById(req.session.userId);
    res.json(user);
}

const addFavSongHandler = async (req, res) => {
    const { song } = req.body;

    const user = await UserModel.findById(req.session.userId);

    user.favoriteSongs.push(song);

    user.queuedSongs.push(song);


    await user.save();
}

const removeFavSongHandler = async (req, res) => {
    const { song } = req.body;

    const user = await UserModel.findById(req.session.userId);
    user.favoriteSongs.remove(song);
    user.queuedSongs.remove(song);

    await user.save();
}

const getSongs = async (req, res) => {
    const songs = await SongModel.find();
    
    res.json(songs);
}

const setQueueHandler = async (req, res) => {
    const user = await UserModel.findById(req.session.userId);

    await UserModel.findByIdAndUpdate(req.session.userId, { $set: { queuedSongs: user.favoriteSongs } });

    await user.save();
}


module.exports = { favSongsListHandler, addFavSongHandler, removeFavSongHandler, getSongs, setQueueHandler };