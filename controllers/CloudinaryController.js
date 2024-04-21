const cloudinary = require('cloudinary').v2

const uploadImage = async(file)=>{

    cloudinary.config({

        cloud_name:"dduum8wwj",
        api_key:"997166788938169",
        api_secret:"lw7Jxe8rDT_YyRYYltD2qUlhb-o"
    })

    try {

        const result = await cloudinary.uploader.upload(file);
        return result;
        
    } catch (error) {
        
        console.log(error)
    }

   
}
module.exports={
    uploadImage
}