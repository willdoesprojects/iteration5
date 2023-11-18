const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.get("/getfavoritesongs", songsController.favSongsListHandler);

router.post("/addsongtofavorites", songsController.addFavSongHandler);

router.post("/removefavoritesong", songsController.removeFavSongHandler);

router.get("/listsongs", songsController.getSongs);

router.post("/setqueue", songsController.setQueueHandler);

module.exports = router;