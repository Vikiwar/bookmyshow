const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const EmailHelper = require("../utlis/emailHelper");

const bookShow = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate({
        path: "show",
        populate: [
          { path: "movie", model: "Movies" },
          { path: "theatre", model: "Theatres" },
        ],
      });

    // 1) respond immediately
    res.send({
      success: true,
      message: "New Booking done!",
      data: newBooking,
    });

    // 2) send email after — don't await, catch errors instead
    EmailHelper("ticket.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      time: populatedBooking.show.time,
      date: populatedBooking.show.date,
      seats: populatedBooking.seats,
      amount: parseInt(
        populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      ),
      transactionId: populatedBooking.transactionId,
    }).catch((err) => console.error("Email sending failed:", err.message));
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const makePayment = async (req, res) => {
  try {
    const { amount, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie!",
    });

    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message:
        "Payment processing. You will receive a confirmation once the payment is complete",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "Theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched!",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
module.exports = { bookShow, makePayment, getAllBookings };
