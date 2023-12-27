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
              tabPosition="left"
              items={heThongRap.cumRapChieu.map((cumRap) => ({
                key: cumRap.diaChi,
                label: (
                  <div className="w-60 text-red-500 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200">
                    <h1>{cumRap.tenCumRap}</h1>
                    <span className="text-black"> {cumRap.diaChi}</span>
                  </div>
                ),
                children: (
                  <div className="space-y-5">
                    {cumRap.lichChieuPhim.map((phim, index) => (
                      <div
                        key={phim.maLichChieu}
                        className="font-medium bg-red-600 text-white rounded transition duration-300 ease-in-out transform hover:scale-105 text-center w-48 py-2 my-2"
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
      <div className="container grid md:grid-cols-1 lg:grid-cols-2 items-center justify-center relative md:space-y-10">
        <div className="flex flex-col items-center space-y-4">
          <img src={detail.hinhAnh} className="w-72" alt="" />
          <Rate
            style={{ fontSize: 20, color: "yellow" }}
            allowHalf
            count={10}
            value={detail.danhGia}
          />
          <h2 className="text-center text-lg md:text-2xl lg:text-5xl text-red-600 ">
            {detail.tenPhim}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center md:flex-row md:space-x-8 lg:col-span-1 ">
          <div className="flex-grow space-y-10">
            <NavLink
              to=""
              className="py-2 text-center bg-slate-700 text-gray-200 mx-3 overflow-hidden block rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
            >
              Mua vé
            </NavLink>
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              items={generateItems()}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
