
const addressModel = require("../models/AddressModel");
const userModel = require("../models/UserModel")



const createaddress = async (req, res) => {

    try {
        
        const savedaddress = await addressModel.create(req.body)

        const userId = req.body.user;

        // Find the user by id and update its addresses array
        await userModel.findByIdAndUpdate(
            userId,
            { $push: { addresses: savedaddress._id } }, // Push the address id to the addresses array
            { new: true } // To return the updated user document
        );

        res.status(200).json({
            message : "address added ..",
            data : savedaddress,
            flag:1
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message : "Error..",
            // data : savedaddress,
            flag:-1
        })
        
    }

}

module.exports={
    createaddress
}