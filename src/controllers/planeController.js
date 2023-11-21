const Plane = require("../models/Plane");

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Create a new plane
const createPlane = catchAsync(async (req, res) => {
  const { heading, price, duration, validity, details } = req.body;

  const newPlane = await Plane.create({
    heading,
    price,
    duration,
    validity,
    details,
  });

  res.status(201).json(newPlane);
});

// Get all planes
const getAllPlanes = catchAsync(async (req, res) => {
  const planes = await Plane.find();
  res.status(200).json(planes);
});

// Get a specific plane by ID
const getPlaneById = catchAsync(async (req, res) => {
  const planeId = req.params.id;
  const plane = await Plane.findById(planeId);

  if (!plane) {
    return res.status(404).json({ error: "Plane not found" });
  }

  res.status(200).json(plane);
});

// Update a plane by ID
const updatePlaneById = catchAsync(async (req, res) => {
  const planeId = req.params.id;
  const { heading, price, duration, validity, details } = req.body;

  const updatedPlane = await Plane.findByIdAndUpdate(
    planeId,
    {
      heading,
      price,
      duration,
      validity,
      details,
    },
    { new: true }
  );

  if (!updatedPlane) {
    return res.status(404).json({ error: "Plane not found" });
  }

  res.status(200).json(updatedPlane);
});

// Delete a plane by ID
const deletePlaneById = catchAsync(async (req, res) => {
  const planeId = req.params.id;

  const deletedPlane = await Plane.findByIdAndRemove(planeId);

  if (!deletedPlane) {
    return res.status(404).json({ error: "Plane not found" });
  }

  res.status(204).send(); // No content
});

module.exports = {
  createPlane,
  getAllPlanes,
  getPlaneById,
  updatePlaneById,
  deletePlaneById,
};
