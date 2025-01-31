import { Router } from 'express';
import authorization from '../../middlewares/authorization.js';
import { upload } from '../../middlewares/multer.js';
import { STUDENT } from '../../constants/roles.js';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'; // Used for file removal on error
import Student from '../../models/Student.js';

const router = Router();

cloudinary.config({ 
    cloud_name: 'dvcidv8vv', 
    api_key: '213993776715593', 
    api_secret: 'Iux6NojkVU8TUau5-B-0ngHCfhw' 
});

// Cloudinary upload function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log('File uploaded to Cloudinary:', response.url);
    return response;
  } catch (error) {
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.log('Error deleting local file:', err);
      }
    }); // Remove the locally saved file if an error occurs
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Route for uploading resume
router.post(
  '/uploadRes',
  authorization,
  (req, res, next) => {
    // Only allow students to upload resumes
    if (req.user.role !== STUDENT) {
      return res
        .status(403)
        .json({ message: 'Access denied. Only students can upload resumes.' });
    }
    next();
  },
  upload.single('resume'), // Multer upload middleware
  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Upload the file to Cloudinary
      const cloudinaryResponse = await uploadOnCloudinary(file.path);

      if (!cloudinaryResponse) {
        return res.status(500).json({ message: 'Failed to upload resume to Cloudinary' });
      }

      await Student.findByIdAndUpdate(
        req.user._id,
        { resume: cloudinaryResponse.secure_url }, // Save the Cloudinary URL to the resume field
        { new: true } // Return the updated document
      );

      // Return the Cloudinary URL of the uploaded file
      res.status(200).json({
        message: 'Resume uploaded successfully',
        filePath: cloudinaryResponse.secure_url, // Use the secure URL from Cloudinary
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;