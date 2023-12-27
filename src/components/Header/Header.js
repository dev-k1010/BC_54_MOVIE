import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // useNavigate dùng để điều hướng trang, không gây reload
  let navigate = useNavigate();
  let user = useSelector((state) => state.userReducer.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderMenu = () => {
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
      <div className="absolute top-full -right-12 mt-2">
        <ul className="bg-white border border-gray-100 rounded ">
          {user && (
            <h1 className="justify-center text-center text-red-500  border-black border-b md:hidden">
              {user.hoTen}
            </h1>
          )}

          {renderButton(user ? "Settings" : "Sign In", () => {
            if (user) {
              // Chuyển trang snag "Sign Up" tại đây
            } else {
              window.location.href = "/login";
            }
          })}

          {!user &&
            renderButton("Sign Up", () => {
              window.location.href = "/signup";
            })}

          {user && (
            <>
              {renderButton("Ticket", () => {
                // Chuyển trang sang "Đặt vé" tại đây
              })}
              {renderButton("Sign Out", () => {
                window.location.href = "/";
                localStorage.removeItem("USER_INFO");
              })}
            </>
          )}
        </ul>
      </div>
    );
    return (
      <div className="flex space-x-4 items-center justify-center">
        {user && <h1 className="text-red-500 hidden md:block">{user.hoTen}</h1>}
        <button className="theme px-6 py-4" onClick={handleDropdown}>
          ☰
        </button>
        {isDropdownOpen && commonButtons}
      </div>
    );
  };

  // Render
  return (
    <div className="flex px-16 h-20 w-full items-center justify-between bg-gray-800 opacity-80 fixed z-10 ">
      <span
        onClick={() => {
          navigate("/");
        }}
        className="font-medium text-red-600 text-3xl cursor-pointer"
      >
        CyberFlix
      </span>

      <div className="glowing-btn hidden lg:block ">
        <div className=" grid grid-cols-4 gap-4 text-white">
          <button>Lịch chiếu</button>
          <button>Cụm rạp</button>
          <button>Chi tiết</button>
          <button>Ứng dụng</button>
        </div>
      </div>
      <div className="relative ">{renderMenu()}</div>
    </div>
  );
}
