const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 4000

app.use(express.json())
const corsOptions = {
    origin: 'YOUR_FRONTEND_DOMAIN', // Replace with your frontend's domain (e.g., 'https://yourwebsite.com')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true, // If you're using cookies or authorization headers
  };
  
  app.use(cors(corsOptions));

// var db = mongoose.connect("mongodb://127.0.0.1:27017/LocalServiceManagement")

var db = mongoose.connect("mongodb+srv://vankarrohan56:rohan%40123@cluster0.bnil0sn.mongodb.net/LocalServiceManagement")

// mongodb+srv://vankarrohan56:<password>@cluster0.bnil0sn.mongodb.net/ rohan%40123 LocalServiceManagement

db.then(()=>{
    console.log("Successfully connected to mongodb...")

}).catch((err)=>{
    console.log(err)
})

const roleRoutes = require("./routes/RoleRoute.js");
const userRoutes = require("./routes/UserRoutes.js")
const serviceproviderRoutes = require("./routes/ServiceProviderRoute.js")
const categoryRoutes = require("./routes/CategoryRoute.js")
const subcatetoryRoutes = require("./routes/SubCategoryRoute.js")
const typeRoutes = require("./routes/TypeRoute.js")
const serviceRoutes = require("./routes/ServiceRoute.js")
const bookingRoutes = require("./routes/BookingRoute.js")
const uploadRoutes = require("./routes/UploadRoutes.js")
const addressRoutes = require("./routes/AddressRoutes.js")

app.use("/roles",roleRoutes)
app.use("/users",userRoutes)
app.use("/sproviders",serviceproviderRoutes)
app.use("/categories",categoryRoutes)
app.use("/Scategories",subcatetoryRoutes)
app.use("/types",typeRoutes)
app.use("/services",serviceRoutes)
app.use("/bookings",bookingRoutes)
app.use("/uploads",uploadRoutes)
app.use("/addresses",addressRoutes)



app.listen(PORT,()=>{

    console.log(`Server is running on port ${PORT}`)
})