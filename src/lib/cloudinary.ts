import { v2 as cloudinary} from 'cloudinary';

// Configure Cloudinary using the Node.js SDK, not `next-cloudinary`.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Async function to upload files to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
}

export default uploadOnCloudinary;
