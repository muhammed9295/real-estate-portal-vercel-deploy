import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log(localFilePath);
  try {
    if (!localFilePath) return null;
    // Upload the file in cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Once the upload completes successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlink(localFilePath);
    return null;
  }
};

const uploadMultipleOnCloudinary = async (localFilePaths) => {
  try {
    if (!localFilePaths || !Array.isArray(localFilePaths)) return null;

    // Upload the files in cloudinary
    const responses = await Promise.all(
      localFilePaths.map((filePath) =>
        cloudinary.uploader.upload(filePath, { resource_type: "auto" })
      )
    );

    // Delete local file after upload
    localFilePaths.forEach(filePath => fs.unlinkSync(filePath));
    return responses;
    // Delete local file after upload

  } catch (error) {
    localFilePaths.forEach(filePath => fs.unlink(filePath))
    return null;
  }
};

export { uploadOnCloudinary, uploadMultipleOnCloudinary };
