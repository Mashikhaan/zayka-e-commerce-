import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {
    user,
    loading,
    handleGetMe,
    handleLogout,
    handleAvatarUpload,
  } = useAuth();

  const navigate = useNavigate();
  const fileRef = useRef(null);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">User not found</p>
      </div>
    );
  }

  // fallback initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await handleAvatarUpload(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">

            {/* hidden input */}
            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* avatar */}
            <div
              onClick={() => fileRef.current.click()}
              className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-700">
                  {getInitials(user.username || "U")}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500">
              Click to change avatar
            </p>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.username || user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 space-y-4">

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Username</span>
            <span className="font-medium text-gray-800">
              {user.username || "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-800">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">User ID</span>
            <span className="font-medium text-gray-800">
              {user.id || user._id}
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={async () => {
              await handleLogout();
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;