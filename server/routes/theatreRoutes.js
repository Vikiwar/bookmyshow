const theatreRouter = require("express").Router();
const {
  addTheatre,
  getAllTheatres,
  getTheatreByOwner,
  updateTheatre,
  deleteTheatre,
} = require("../controller/theatreController");

theatreRouter.get("/get-all-theatres", getAllTheatres);
theatreRouter.post("/add-theatre", addTheatre);
theatreRouter.get("/get-theatre-by-owner/:ownerId", getTheatreByOwner);
theatreRouter.put("/update-theatre", updateTheatre);
theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);

module.exports = theatreRouter;
