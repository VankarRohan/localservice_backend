const cloudinary = require('cloudinary').v2

const uploadImage = (file)=>{

    cloudinary.config({

        cloud_name:"dduum8wwj",
        api_key:"997166788938169",
        api_secret:"lw7Jxe8rDT_YyRYYltD2qUlhb-o"
    })

    cloudinary.uploader.upload(file,(error,result)=>{

    })
}
module.exports={
    uploadImage
}