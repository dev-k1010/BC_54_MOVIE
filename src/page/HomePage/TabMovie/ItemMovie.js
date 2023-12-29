import moment from "moment/moment";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ItemMovie({ data, isLoggedIn, key }) {
  const [maxItemTab, setMaxItemTab] = useState(6);
  const handleToggleShow = (show) =>setMaxItemTab(show ? data.lstLichChieuTheoPhim.length : 6);

  const renderNavLink = (lichChieu) => {
    const navigateLink = isLoggedIn
      ? `/booking/${parseInt(lichChieu.maLichChieu, 10)}`
      : "/login";

    return (
      <NavLink
        to={navigateLink}
        key={lichChieu.maLichChieu}
        className="font-medium bg-red-600 text-white rounded p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white "
      >
        {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-YY ~ hh:mm")}
      </NavLink>
    );
  };

  return (
    <div className="w-full flex space-x-5 items-start">
      <img className="w-32 h-48" src={data.hinhAnh} alt="" />
      <div className="flex flex-col">
        <h2 className="text-xl text-white mb-2">{data.tenPhim}</h2>
        <div className="grid grid-cols-2 gap-2 ">
          {data.lstLichChieuTheoPhim.slice(0, maxItemTab).map(renderNavLink)}
        </div>
        <div className="mx-auto">
          {data.lstLichChieuTheoPhim.length > 6 && (
            <button
              onClick={() => handleToggleShow(maxItemTab === 6)}
              className="mt-4 px-5 py-2 rounded block text-center bg-slate-700 text-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {maxItemTab === 6 ? "Xem thêm" : "Thu gọn"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
