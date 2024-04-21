const servicemodel = require('../models/ServiceModel');
const cloudinary = require("../controllers/CloudinaryController")
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({

    destination: "./uploads",
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})


const upload = multer({

    storage: storage,

    limiits: { fileSize: 100000 }
}).single('myImage')

const createservice = async(req,res) =>{
    upload(req,res,async(err) =>{
        if(err){
            res.status(500).json({
                message : "Error Uploading File"
            })
        }
        else{
            if(req.file == undefined){
                res.status(400).json({
                    message : "No File Selected"
                })
            }
            else{
                //data...
                const result = await cloudinary.uploadImage(req.file.path);
                console.log(result)
                //console.log("Upload Controller",result);
                //console.log("Upload Controller",result.secure_url);
                //console.log(req.body);
                const serviceobj = ({
                    servicename : req.body.servicename,
                    category:req.body.category,
                    subcategory:req.body.subcategory,
                    serviceprovider:req.body.serviceprovider,
                    type:req.body.type,
                    fees:req.body.fees,
                    area:req.body.area,
                    city:req.body.city,
                    state:req.body.state,
                    imageUrl : result?.secure_url
                })
                const savedSer = await servicemodel.create(serviceobj);
                res.status(200).json({
                    message : "File Uploaded",
                    data : savedSer
                    //file : uploads/${req.file.filename}
                })
            }
        }
    })
}

// const createservice = async (req, res) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 console.log(err)
//                 res.status(500).json({
//                     message: "Error uploading file"
//                 })
//             }
//             else {
//                 console.log("file....", req.file)
//                 const result = await cloudinary.uploadImage(req.file.path);
//                 console.log(result)
//                 const serviceObj = {
//                     servicename: req.body.servicename,
//                     serviceprovider: req.body.serviceprovider,
//                     imageUrl: result.secure_url,
//                     area: req.body.area,
//                     city: req.body.city,
//                     state: req.body.state,
//                     fees: req.body.fees,
//                     type: req.body.type,
//                     category: req.body.category,
//                     subcategory: req.body.subcategory,
//                 };
//                 const savedService = await servicemodel.create(serviceObj);
//                 res.status(200).json({
//                     message: "Service Created",
//                     flag: 1,
//                     data: savedService,
//                 });

//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             flag: -1,
//             data: error,
//         });
//     }
// };


// const createservice = async (req, res) => {

//     try {


//         const savedservice = await servicemodel.create(req.body)
//         res.status(200).json({

//             message: "Service created successfully...",
//             data: savedservice,
//             flag: 1
//         })

//     } catch (e) {

//         res.status(500).json({

//             message: "Error in server !!!",
//             data: e,
//             flag: -1
//         })
//     }
// }

const getservice = async (req, res) => {

    try {

        const savedservice = await servicemodel.find().populate('category').populate('type').populate('subcategory').populate("serviceprovider")

        res.status(200).json({

            message: "Service fetched successfully...",
            data: savedservice,
            flag: 1
        })

    } catch (e) {

        res.status(500).json({

            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const getserviceById = async (req, res) => {

    try {

        const id = req.params.id
        const savedservice = await servicemodel.findById(id).populate('category').populate('type').populate('subcategory').populate("serviceprovider")

        res.status(200).json({

            message: "Service fetched successfully...",
            data: savedservice,
            flag: 1
        })

    } catch (e) {

        res.status(500).json({

            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const deleteservice = async (req, res) => {

    try {

        const deletedservice = await servicemodel.findByIdAndDelete(req.params.id);

        if (deletedservice != null) {

            res.status(200).json({

                message: "Service deleted successfully...",
                data: deletedservice,
                flag: 1
            })

        } else {

            res.status(404).json({

                message: "Service not found !!!",
                flag: -1
            })
        }

    } catch (e) {

        res.status(500).json({

            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const updateservice = async (req, res) => {

    try {

        const updatedservice = await servicemodel.findByIdAndUpdate(req.params.id, req.body);
        if (updatedservice != null) {

            res.status(200).json({

                message: "Service updated successfully...",
                flag: 1
            })

        } else {

            res.status(404).json({

                message: "Service not found !!!",
                flag: -1
            })
        }


    } catch (e) {

        res.status(500).json({

            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const getSproviderByServiceId = async (req, res) => {

    try {

        const id = req.params.id;
        const services = await servicemodel.find({ serviceprovider: id }).populate('category').populate('type').populate('subcategory');

        if (services == null) {

            res.status(404).json({
                messaage: "service provider not found !!!",
                flag: -1
            })

        } else {
            res.status(200).json({
                message: "Fetched service provider...",
                data: services,
                flag: 1
            });
        }


    } catch (e) {

        res.status(500).json({
            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const filterProduct = async (req, res) => {

    console.log(req.query)



    const savedservice = await servicemodel.find({ servicename: { $regex: req.query.servicename, $options: "i" } })
        .populate('category')
        .populate('type')
        .populate('subcategory')
        .populate("serviceprovider")

    if (savedservice && savedservice.length > 0) {

        res.status(200).json({
            message: "Product found.",
            data: savedservice,
            flag: 1,
        });

    } else {

        res.status(404).json({
            message: "No product found",
            data: [],
        });

    }




}

// const filterbyaddress = async (req, res) => {


//     try {

//         const { latitude, longitude } = req.body;

//         if (!latitude || !longitude) {
//             return res.status(400).json({
//                 message: "Latitude and longitude are required in the request body.",
//                 data: [],
//             });
//         }

//         const radiusInMeters = 5000;

//         // Perform a geospatial query to find services within 5 kilometers
//         const savedservice = await servicemodel.find({
//             location: {
//                 $geoWithin: {
//                     $centerSphere: [[longitude, latitude], radiusInMeters / 6378.1] // Earth radius in kilometers
//                 }
//             }
//         })
//             .populate('category')
//             .populate('type')
//             .populate('subcategory')
//             .populate("serviceprovider")

//         console.log(savedservice)
//         if (savedservice && savedservice.length > 0) {

//             res.status(200).json({
//                 message: "services found.",
//                 data: savedservice,
//                 flag: 1,
//             });

//         } else {

//             // console.log(error)
//             res.status(404).json({
//                 message: "No service found",
//                 data: [],
//             });

//         }

//     } catch (error) {


//         res.status(500).json({
//             message: "Error in server !!!",
//             data: error,
//             flag: -1
//         })


//     }
// }



module.exports = {
    createservice,
    getservice,
    deleteservice,
    getserviceById,
    updateservice,
    getSproviderByServiceId,
    filterProduct,
    // filterbyaddress
}