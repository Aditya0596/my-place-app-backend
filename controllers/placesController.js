import Place from "../models/Place.js";

// Get all places of a user or filter by category
export const getPlaces = async (req, res) => {
  try {
    const filter = { userId: req.user.userId }; // Only current user's places
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const places = await Place.find(filter);
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new place for the logged-in user
export const createPlace = async (req, res) => {
  const { title, desc, img, category } = req.body;

  if (!title || !desc || !img || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPlace = new Place({
      title,
      desc,
      img,
      category,
      userId: req.user.userId,
    });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a place by ID (only if owned by user)
export const updatePlace = async (req, res) => {
  const { title, desc, img, category } = req.body;

  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update this place" });
    }

    place.title = title;
    place.desc = desc;
    place.img = img;
    place.category = category;

    const updatedPlace = await place.save();
    res.json(updatedPlace);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a place by ID (only if owned by user)
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this place" });
    }

    await place.deleteOne();
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
