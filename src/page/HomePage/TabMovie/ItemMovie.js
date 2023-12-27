import moment from "moment/moment";
import React, { useState } from "react";

export default function ItemMovie  ({ data }) {
  const [maxItemTab, setMaxItemTab] = useState(6);
  const handleToggleShow = (show) =>
    setMaxItemTab(show ? data.lstLichChieuTheoPhim.length : 6);

  return (
    <div className="w-full flex space-x-5 items-start">
      <img className="w-32 h-48" src={data.hinhAnh} alt="" />
      <div className="flex flex-col">
        <h2 className="text-xl text-white mb-2">{data.tenPhim}</h2>
        <div className="grid grid-cols-2 gap-2 ">
          {data.lstLichChieuTheoPhim.slice(0, maxItemTab).map((lichChieu) => (
            <span
              key={lichChieu.maLichChieu}
              className="font-medium bg-red-600 text-white rounded p-2  transition duration-300 ease-in-out transform hover:scale-105 "
            >
              {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-YY ~ hh:mm")}
            </span>
          ))}
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
};


