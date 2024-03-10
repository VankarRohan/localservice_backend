const routes = require('express').Router()
const bookingcontroller = require('../controllers/BookingController')


routes.post("/booking",bookingcontroller.createBooking);
routes.get("/booking",bookingcontroller.getAllBooking);
// routes.get("/category/:id",categorycontroller.deletecategory);
routes.put("/booking/:id",bookingcontroller.updateBooking)
routes.put("/bookingstatus/:id",bookingcontroller.updateBookingStatus)
routes.get("/booking/user/:id",bookingcontroller.getBookingByUserId)


module.exports = routes  