const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "New theatre has been added!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");

    res.send({
      success: true,
      data: allTheatres,
      message: "All theatres have been fetched!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getTheatreByOwner = async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      data: theatres,
      message: "Theatres fetched successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.body.theatreId,
      req.body,
      { new: true },
    );
    if (!theatre) {
      res.status(404).send({
        success: false,
        message: "Theatre not found!",
      });
    } else {
      res.send({
        success: true,
        data: theatre,
        message: "Theatre updated successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.theatreId);
    if (!theatre) {
      res.status(404).send({
        success: false,
        message: "Theatre not found!",
      });
    } else {
      res.send({
        success: true,
        message: "Theatre deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTheatre,
  getAllTheatres,
  getTheatreByOwner,
  updateTheatre,
  deleteTheatre,
};
