import cloudinary from 'next-cloudinary';

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
},{
    useCDN: false,
    secure: true,
    api_base: 'https://api.cloudinary.com'
});

if (!cloudinaryConfig){
    throw new Error("Cloudinary config not found");
}

const uploadOnCloudinary = async (LocalFilePath:any)=>{
    try {
        const result = await cloudinary.uploader.upload(LocalFilePath);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default cloudinaryConfig;