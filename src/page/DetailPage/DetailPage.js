import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Rate, Tabs } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { TURN_OFF, TURN_ON } from "../../redux/constant/spinner";

export default function DetailPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userReducer.user);
  const [detail, setDetail] = useState([]);
  const { idPhim } = useParams();
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    dispatch({
      type: TURN_ON,
    });
    https(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idPhim}`)
      .then((res) => {
        setDetail(res.data.content);
        dispatch({
          type: TURN_OFF,
        });
      })
      .catch((err) => {
        dispatch({
          type: TURN_OFF,
        });
      });
  }, []);

  const renderNavLink = (lichChieuPhim) => {
    const formattedDateTime = moment(lichChieuPhim.ngayChieuGioChieu).format(
      "DD-MM-YY ~ hh:mm"
    );

    const commonProps = {
      key: lichChieuPhim.maLichChieu,
      className:
        "font-medium bg-red-600 text-white rounded  hover:text-white text-center w-48 p-2 my-2",
    };

    // isLoggedIn = true => chuyển sang ptrang Booking : chuyển sang trong Login
    if (isLoggedIn) {
      return (
        <NavLink to={`/booking/${lichChieuPhim.maLichChieu}`} {...commonProps}>
          {formattedDateTime}
        </NavLink>
      );
    } else {
      // Nếu chưa đăng nhập, điều hướng đến trang SignIn
      return (
        <NavLink to="/login" {...commonProps}>
          {formattedDateTime}
        </NavLink>
      );
    }
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
                      <span className="text-black whitespace-normal">
                        {" "}
                        {cumRap.diaChi}
                      </span>
                    </div>
                    <div className="md:hidden mt-3 transition duration-300 ease-in-out transform hover:scale-105">
                      {cumRap.lichChieuPhim.map(renderNavLink)}
                    </div>
                  </div>
                ),
                children: (
                  <div className="space-y-5">
                    {cumRap.lichChieuPhim.map((phim, index) => (
                      <div className="hidden transition duration-300 ease-in-out transform hover:scale-105 md:block">
                        {cumRap.lichChieuPhim.map(renderNavLink)}
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
      className="bg-cover bg-center relative w-full min-h-screen flex justify-center items-center mt-20"
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-gray-800/30 "></div>

      <div className="relative container grid grid-cols-1 items-center justify-center  lg:flex lg:justify-center lg:space-x-24">
        {/* Left */}
        <div className="flex flex-col items-center space-y-4 ">
          <img src={detail.hinhAnh} className="w-72 max-w-full " />
          <Rate
            style={{ fontSize: 20, color: "yellow" }}
            allowHalf
            count={10}
            value={detail.danhGia}
          />
        </div>
        {/* Right */}
        <div className="mt-10 rounded-lg p-4 backdrop-blur-sm bg-white/20 lg:flex flex-col items-center justify-center md:flex-row  lg:col-span-1">
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
