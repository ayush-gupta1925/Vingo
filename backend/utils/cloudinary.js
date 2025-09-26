import dotenv from "dotenv";
dotenv.config(); //

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (filePath) => {
  // Configure once globally
        
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath);

    // Remove local file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    // Cleanup if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload error:", err);
    return null;
  }
};
