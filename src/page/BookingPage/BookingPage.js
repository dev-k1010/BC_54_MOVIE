import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import { TURN_OFF, TURN_ON } from "../../redux/constant/spinner";
import { hover } from "@testing-library/user-event/dist/hover";

export default function BookingPage() {
  const [booking, setBooking] = useState([]);
  const dispatch = useDispatch();
  const { idPhim } = useParams();

  useEffect(() => {
    https(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idPhim}`)
      .then((res) => {
        setBooking(res.data.content);
        dispatch({ type: TURN_OFF });
      })
      .catch((err) => {
        dispatch({ type: TURN_OFF });
      });
  }, []);

  const renderGhe = () => {
    return booking.danhSachGhe.map((ghe, index) => {
      let backgroundColor = "bg-slate-600"; // Màu mặc định
      let hoverColor = "hover:scale-125";
      let cursorStyle = "cursor-pointer";

      if (ghe.loaiGhe === "Vip") {
        backgroundColor = "bg-yellow-600"; // Đổi màu cho ghế VIP
      }

      if (ghe.daDat) {
        backgroundColor = "bg-red-600"; // Đổi màu cho ghế đã đặt
        hoverColor = ""; // Không thêm hiệu ứng hover nếu đã đặt
        cursorStyle = "cursor-not-allowed";
      }
      // bg-${backgroundColor}
      return (
        <button
          key={index}
          className={`w-9 h-9 rounded-sm m-2 text-center text-xs ${backgroundColor} transition duration-300 ease-in-out transform ${hoverColor} ${cursorStyle}`}
        >
          {ghe.stt}
        </button>
      );
    });
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const renderGheRows = (ghes) => {
    return ghes.map((row, rowIndex) => (
      <div key={rowIndex} className="flex text-center justify-center">
        {row}
      </div>
    ));
  };

  return (
    <div className="relative mt-20">
      {booking.thongTinPhim ? (
        <div className="md:grid md:grid-cols-12 w-full min-h-screen flex flex-col text-center">
          {/* left */}
          <div className="col-span-8">
            {renderGheRows(chunkArray(renderGhe(), 16))}
          </div>

          {/* right */}
          <div className="col-span-4  bg-black backdrop-blur-sm bg-blue-400/20">
            <h1 className="text-center text-2xl text-green-600 py-4">0đ</h1>
            <div className="p-2 space-y-4">
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <h3>Cụm Rạp:</h3>
                <span className="text-green-800">
                  {booking.thongTinPhim.tenCumRap}
                </span>
              </div>
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <h3>Địa chỉ:</h3>
                <span className="text-green-800">
                  {booking.thongTinPhim.diaChi}
                </span>
              </div>
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <h3>Rạp:</h3>
                <span className="text-green-800">
                  {booking.thongTinPhim.tenRap}
                </span>
              </div>
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <h3>Ngày giờ chiếu:</h3>
                <div className="space-x-2">
                  <span className="text-green-800">
                    {booking.thongTinPhim.ngayChieu}
                  </span>
                  <span className="text-green-800">
                    {booking.thongTinPhim.gioChieu}
                  </span>
                </div>
              </div>
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <h3>Tên phim:</h3>
                <span className="text-green-800">
                  {booking.thongTinPhim.tenPhim}
                </span>
              </div>
              <hr className="mx-3" />
              <div className="text-sm flex justify-between">
                <img src={booking.thongTinPhim.hinhAnh} className="w-32" />
              </div>
              <hr className="mx-3" />
              <div className="text-sm h-full flex flex-col text-center">
                <button className="bg-red-600 rounded-lg px-12 py-4 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200">
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center top-0 left-0">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
