import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Rate, Tabs } from "antd";
import moment from "moment";

export default function DetailPage() {
  const [detail, setDetail] = useState([]);
  let { idPhim } = useParams();

  useEffect(() => {
    https(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idPhim}`)
      .then((res) => setDetail(res.data.content))
      .catch((err) => {});
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  console.log("🙂 ~ DetailPage ~ detail:", detail);

  const generateItems = () =>
    detail.heThongRapChieu
      ? detail.heThongRapChieu.map((heThongRap, index) => ({
          key: index,
          label: (
            <img
              className="w-16 transition duration-300 ease-in-out transform hover:scale-105"
              src={heThongRap.logo}
              alt=""
            />
          ),
          children: (
            <Tabs
              style={{
                height: 200,
              
              }}
              tabPosition="left"
              items={heThongRap.cumRapChieu.map((cumRap) => ({
                key: cumRap.diaChi,
                label: (
                  <div className="">
                    <div className="w-60 text-red-500 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200">
                      <h1>{cumRap.tenCumRap}</h1>
                      <span className="text-black whitespace-normal"> {cumRap.diaChi}</span>
                    </div>
                    <div
                      key={cumRap.lichChieuPhim.maLichChieu}
                      className="font-medium bg-red-600 text-white rounded transition duration-300 ease-in-out transform hover:scale-105 text-center w-48 py-2 my-2 md:hidden"
                    >
                      {moment(cumRap.lichChieuPhim.ngayChieuGioChieu).format(
                        "DD-MM-YY ~ hh:mm"
                      )}
                    </div>
                  </div>
                ),
                children: (
                  <div className="space-y-5">
                    {cumRap.lichChieuPhim.map((phim, index) => (
                      <div
                        key={phim.maLichChieu}
                        className="font-medium bg-red-600 text-white rounded transition duration-300 ease-in-out transform hover:scale-105 text-center w-48 py-2 my-2  hidden md:block"
                      >
                        {moment(phim.ngayChieuGioChieu).format(
                          "DD-MM-YY ~ hh:mm"
                        )}
                      </div>
                    ))}
                  </div>
                ),
              }))}
            />
          ),
        }))
      : [];

  return (
    <div
      style={{
        backgroundImage: `url(${detail.hinhAnh})`,
      }}
      className="bg-cover bg-center relative w-full min-h-screen flex justify-center items-center"
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-gray-800/30 "></div>

      <div className="relative container grid grid-cols-1 items-center justify-center  lg:flex lg:justify-center md:space-y-10 lg:space-x-24">
        {/* Left */}
        <div className="flex flex-col items-center space-y-4 ">
          <img src={detail.hinhAnh} className="w-72 max-w-full " />
          <Rate
            style={{ fontSize: 20, color: "yellow" }}
            allowHalf
            count={10}
            value={detail.danhGia}
          />
          <NavLink
            to=""
            className=" py-2 px-12 text-center bg-slate-700 text-gray-200 mx-3 overflow-hidden block rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
          >
            Mua vé
          </NavLink>
        </div>
        {/* Right */}
        <div className=" rounded-lg p-4 backdrop-blur-sm bg-white/20 lg:flex flex-col items-center justify-center md:flex-row  lg:col-span-1">
          <div className="flex-grow space-y-10 ">
            <h2 className="text-center text-5xl text-red-600 ">
              {detail.tenPhim}
            </h2>

            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              items={generateItems()}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
