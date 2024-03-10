const BookingSchema = require('../models/BookingModel')

const createBooking = async (req, res) => {
    try {
        const savedBooking = (await BookingSchema.create(req.body));
        res.status(200).json({
            message: "Booking  Created",
            flag: 1,
            data: savedBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            flag: -1,
            data: error,
        });
    }
};

const getAllBooking = async (req, res) => {
    try {
        const booking = await BookingSchema.find();
        res.status(200).json({
            message: "Booking Fetched",
            flag: 1,
            data: booking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            flag: -1,
            data: error,
        });
    }
};

const getBookingByUserId = async (req,res) => {


    try {


        const id = req.params.id;
        const bookings = await BookingSchema.find({ user: id })

        if (bookings == null) {

            res.status(404).json({
                messaage: "booking not found !!!",
                flag: -1
            })
        }

        else {
            res.status(200).json({
                message: "Fetched Bookings...",
                data: bookings,
                flag: 1
            });


        }
    } catch (error) {

        
       console.log(error)
    }
}

const updateBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const updateBooking = await RoleSchema.findByIdAndUpdate(id)

        res.status(201).json({
            message: "Role updated successfully..",
            flag: 1,
            data: updateBooking,
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            flag: -1,
            data: error,
        });
    }
}

const updateBookingStatus = async (req, res) => {


    try {

        req.body = {
            "status": "done"
        }
        const body = req.body
        const updatedbookingstatus = await BookingSchema.findByIdAndUpdate(req.params.id, body)

        if (updatedbookingstatus != null) {
            res.status(201).json({

                message: "Booking done..",
                data: updatedbookingstatus,
                flag: 1
            })
        } else {
            res.status(404).json({

                message: "Booking not found !",
                // data:updatedbookingstatus,
                flag: -1
            })

        }
    } catch (e) {

        res.status(500).json({
            message: "Error to book !",
            data: e,
            flag: -1
        })
    }
}


module.exports = {

    createBooking,
    updateBooking,
    getAllBooking,
    updateBookingStatus,
    getBookingByUserId

}