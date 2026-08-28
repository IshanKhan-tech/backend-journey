const express = require("express");
const upload = require("../middlewears/upload.middlewear");
const songController = require("../controllers/song.controller");
const authMiddlewear = require("../middlewears/auth.middlewear");

const router = express.Router();

/**
 * POST /api/songs/
 */

router.post(
  "/",
  authMiddlewear,
  upload.single("song"),
  songController.uploadSong,
);

router.get("/get", authMiddlewear, songController.getSong);

module.exports = router;
