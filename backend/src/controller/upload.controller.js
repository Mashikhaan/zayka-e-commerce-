import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    console.log("USER:", req.user);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    // 🔥 FIX: correct user model usage
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // save avatar
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({
      message: "Upload successful",
      user, // 👈 send updated user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default uploadImage;