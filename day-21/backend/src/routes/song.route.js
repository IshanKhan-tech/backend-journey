const express = require("express")
const upload = require("../middlewears/upload.middlewear")
const songController = require("../controllers/song.controller")


const router = express.Router()

/**
 * POST /api/songs/
 */

router.post("/", upload.single("song"), songController.uploadSong)
router.get("/get", songController.getSong)

module.exports = router