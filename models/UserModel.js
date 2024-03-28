const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const addressSchema = require("./AddressModel")


// const addressSchema = new Schema({
//   address: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   postalCode: {
//     type: String,
//     required: true
//   },

// });

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
    min: 10,
    max: 10,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role"
  },
  latitude: {
    type: String

  },
  longitude: {
    type: String

  },
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: "Address" // Reference to the Address model
  }]
});
// addresses: {
//   type: [addressSchema], // Array of address objects
//   default: [] // Initial value as an empty array
// }

module.exports = mongoose.model("User1", userSchema);
