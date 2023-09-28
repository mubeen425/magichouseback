const express = require("express");

const {
makePayment, paymentConfirmationHook,

} = require("../controllers/subscriptionController");
const requireAuth = require("../middlewares/requireAuth");
const restrictTo = require("../middlewares/restrictTo");
const { uploadMulter, uploadToCloud, uploadHandler } = require("../utils/uploadHelper");



const router = express.Router();





router.post('/payment',requireAuth,restrictTo("US"), makePayment);
router.post('/webhook', paymentConfirmationHook);
module.exports = router;
