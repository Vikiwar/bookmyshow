const router = require("express").Router();
const {
  bookShow,
  makePayment,
  getAllBookings,
} = require("../controller/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book-show", authMiddleware, bookShow);
router.post("/make-payment", authMiddleware, makePayment);
router.get("/get-all-bookings/:userId", authMiddleware, getAllBookings);

module.exports = router;
