const express = require("express");
const {
  createPlane,
  getAllPlanes,
  getPlaneById,
  updatePlaneById,
  deletePlaneById,
} = require("../controllers/planeController");

const router = express.Router();

// Define the requireAuth middleware
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers; // Extract the token from headers

  if (!authorization) {
    return res.status(401).json({ error: "Missing token in the headers" });
  }

  // Continue to the next middleware if there is a token
  next();
};

// Create a new plane (requires authentication)
router.post("/planes", createPlane);

// Get all planes (requires authentication)
router.get("/planes", requireAuth, getAllPlanes);

// Get a specific plane by ID
router.get("/planes/:id", getPlaneById);

// Update a plane by ID (requires authentication)
router.put("/planes/:id", requireAuth, updatePlaneById);

// Delete a plane by ID (requires authentication)
router.delete("/planes/:id", requireAuth, deletePlaneById);

module.exports = router;
