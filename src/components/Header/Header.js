import React, { useState } from "react";
import { useSelector } from "react-redux";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const renderButton = (text, onClick) => (
    <li>
      <button
        className="text-xs w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-200"
        onClick={onClick}
      >
        {text}
      </button>
    </li>
  );
  const commonButtons = (
    <div className="absolute top-full -right-3 lg:top-full lg:-right-12 mt-2">
      <ul className="bg-white border border-gray-100 rounded ">
        {user && (
          <h1 className="justify-center text-center text-red-500 border-black border-b md:hidden">
            {user.hoTen}
          </h1>
        )}
        {renderButton(user ? "Account" : "Sign In", () => {
          if (user) {
            // Chuyển trang sang "Sign Up" tại đây
          } else {
            navigate("/login");
          }
        })}
        {!user &&
          renderButton("Sign Up", () => {
            window.location.href = "/signup";
          })}
        {user && (
          <>
            {renderButton("Sign Out", () => {
              window.location.href = "/";
              localStorage.removeItem("USER_INFO");
            })}
          </>
        )}
      </ul>
    </div>
  );
  const renderMenu = () => (
    <div className="flex space-x-4 items-center justify-center">
      {user && <h1 className="text-red-500 hidden md:block">{user.hoTen}</h1>}
      <button className="theme px-6 py-4" onClick={handleDropdown}>
        ☰
      </button>
      {isDropdownOpen && commonButtons}
    </div>
  );
  return (
    <div className="flex px-4 lg:px-16 h-20 w-full items-center justify-between bg-gray-900 opacity-90 fixed top-0 left-0 z-10">
      <span
        onClick={() => navigate("/")}
        className="font-medium text-red-600 text-3xl cursor-pointer"
      >
        CyberFlix
      </span>

      <div className="glowing-btn hidden lg:block ">
        <div className="grid grid-cols-4 gap-4 text-white">
          <button>Lịch chiếu</button>
          <button>Cụm rạp</button>
          <button>Chi tiết</button>
          <button>Ứng dụng</button>
        </div>
      </div>
      <div className="relative">{renderMenu()}</div>
    </div>
  );
}
