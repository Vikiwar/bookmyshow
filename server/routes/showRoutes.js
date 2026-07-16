const showRouter = require("express").Router();
const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatreaAndMovie,
  getAllShowsByTheatre,
  getShowById,
} = require("../controller/showController");

showRouter.post("/add-show", addShow);
showRouter.post("/delete-show", deleteShow);
showRouter.put("/update-show", updateShow);
showRouter.post("/get-all-theatres-by-movie", getAllShowsByTheatreaAndMovie);
showRouter.post("/get-all-shows-by-theatre", getAllShowsByTheatre);
showRouter.get("/get-show-by-id/:showId", getShowById);

module.exports = showRouter;
