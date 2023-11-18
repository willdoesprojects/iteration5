const express = require("express");
const router = express.Router();
const musicPlayerController = require("../controllers/musicPlayerController");

router.get("/", musicPlayerController.homePageHandler);

router.get("/getsongqueue", musicPlayerController.getSongQueueHandler);


module.exports = router;