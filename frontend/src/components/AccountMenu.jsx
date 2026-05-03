import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/hooks/useAuth";
import AvatarUploader from "./AvatarUploader"; // 👈 new component
import { FaUser } from "react-icons/fa";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, handleLogout, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>

      {/* 🔥 AVATAR / ICON (ALWAYS VISIBLE) */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {user?.avatar ? (
          <img src={user.avatar} className="w-full h-full object-cover" />
        ) : user ? (
          <span className="font-bold">
            {user.username?.charAt(0)?.toUpperCase()}
          </span>
        ) : (
          <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-400/30 text-xl hover:bg-amber-500 cursor-pointer"><FaUser/></span>
        )}
      </div>

      {/* 🔽 DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-md overflow-hidden z-50">

          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : !user ? (
            <>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">
                Register
              </Link>

              <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                Login
              </Link>
            </>
          ) : (
            <>
              <p className="px-4 py-2 text-gray-500 border-b">
                Hi, {user.username}
              </p>

              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                My Profile
              </Link>

              <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">
                Order History
              </Link>

              {user.role === "admin" && (
                <Link to="/admin/create-product" className="block px-4 py-2 hover:bg-gray-100 text-blue-600 font-medium">
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}