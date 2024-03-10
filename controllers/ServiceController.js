const servicemodel = require('../models/ServiceModel');

const createservice = async(req,res)=>{

    try{

        
        const savedservice = await servicemodel.create(req.body)
        res.status(200).json({

            message:"Service created successfully...",
            data:savedservice,
            flag:1
        })

    }catch(e){

        res.status(500).json({

            message:"Error in server !!!",
            data :e,
            flag:-1
        })
    }
}

const getservice = async(req,res)=>{

    try{

        const savedservice = await servicemodel.find().populate('category').populate('type').populate('subcategory').populate("serviceprovider")

        res.status(200).json({

            message:"Service fetched successfully...",
            data:savedservice,
            flag:1
        })

    }catch(e){

        res.status(500).json({

            message:"Error in server !!!",
            data:e,
            flag:-1
        })
    }
}

const getserviceById = async(req,res)=>{

    try{

        const id = req.params.id
        const savedservice = await servicemodel.findById(id).populate('category').populate('type').populate('subcategory').populate("serviceprovider")

        res.status(200).json({

            message:"Service fetched successfully...",
            data:savedservice,
            flag:1
        })

    }catch(e){

        res.status(500).json({

            message:"Error in server !!!",
            data:e,
            flag:-1
        })
    }
}

const deleteservice = async(req,res)=>{

    try{

        const deletedservice = await servicemodel.findByIdAndDelete(req.params.id);

        if(deletedservice != null){

            res.status(200).json({

                message:"Service deleted successfully...",
                data:deletedservice,
                flag:1
            })

        }else{

            res.status(404).json({
                
                message:"Service not found !!!",
                flag:-1
            })
        }

    }catch(e){

        res.status(500).json({
            
            message:"Error in server !!!",
            data:e,
            flag:-1
        })
    }
}

const updateservice = async(req,res)=>{

    try{

        const updatedservice = await servicemodel.findByIdAndUpdate(req.params.id,req.body);
        if(updatedservice != null ){

            res.status(200).json({

                message:"Service updated successfully...",
                flag:1
            })

        }else{

            res.status(404).json({

                message:"Service not found !!!",
                flag:-1
            })
        }


    }catch(e){

        res.status(500).json({
        
            message:"Error in server !!!",
            data:e,
            flag:-1
        })
    }
}

const getSproviderByServiceId = async(req,res)=>{

    try{

        const id = req.params.id;
        const services = await servicemodel.find({serviceprovider:id}).populate('category').populate('type').populate('subcategory');

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


    }catch(e){

        res.status(500).json({
            message:"Error in server !!!",
            data:e,
            flag:-1
        })
    }
}



module.exports={
    createservice,
    getservice,
    deleteservice,
    getserviceById,
    updateservice,
    getSproviderByServiceId
}