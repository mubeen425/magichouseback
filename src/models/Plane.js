const mongoose = require("mongoose");

const planeSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
  },
  details: {
    type: String, // Store details as an array of strings
    required: true,
  },
});

const Plane = mongoose.model("Plane", planeSchema);

module.exports = Plane;
