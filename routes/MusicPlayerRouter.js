const express = require("express");
const router = express.Router();
const musicPlayerController = require("../controllers/musicPlayerController");

router.get("/", musicPlayerController.homePageHandler);

router.get("/getsongqueue", musicPlayerController.getSongQueueHandler);

router.post("/incrindex", musicPlayerController.getIndexIncrHandler);

router.post("/decrindex", musicPlayerController.getIndexDecrHandler);

module.exports = router;