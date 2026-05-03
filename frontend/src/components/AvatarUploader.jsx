import { useRef } from "react";
import { useAuth } from "../features/hooks/useAuth";

const AvatarUploader = () => {
  const fileRef = useRef(null);
  const { user, handleAvatarUpload } = useAuth();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await handleAvatarUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        hidden
        ref={fileRef}
        onChange={handleChange}
        accept="image/*"
      />

      <div
        onClick={() => fileRef.current.click()}
        className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-bold text-lg">
            {user?.username?.charAt(0)?.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;