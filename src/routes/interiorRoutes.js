const express = require("express");

const {
    transformRoom
} = require("../controllers/interiorController");
const requireAuth = require("../middlewares/requireAuth");
const restrictTo = require("../middlewares/restrictTo");
const { uploadMulter, uploadToCloud, uploadHandler } = require("../utils/uploadHelper");



const router = express.Router();





router.post('/', requireAuth, restrictTo("US"), uploadMulter.single("image"), uploadHandler, transformRoom);
module.exports = router;
