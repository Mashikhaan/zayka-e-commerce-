/**
 * multer setup for handling file uploads, specifically for user avatars. It defines the storage location and filename format for uploaded files, and exports the configured multer instance for use in routes that handle file uploads.
 */
import multer from "multer";


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export default upload;