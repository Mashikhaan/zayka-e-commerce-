import axios from "axios";

//create an axios instance with base URL and credentials
import api from "./api";
// -------------------------
// UPLOAD AVATAR API CALL
// -------------------------
export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await api.put("/upload/avatar", formData, {
      withCredentials: true, // safe add
    });

    return response.data;
  } catch (error) {
    console.error("Avatar upload error:", error);
    throw error;
  }
}