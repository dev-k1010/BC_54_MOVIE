import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie";
import { useDispatch, useSelector } from "react-redux";
import { TURN_OFF, TURN_ON } from "../../../redux/constant/spinner";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function TabMovie() {
  const [tabMovie, settabMovie] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userReducer.user);
  const isMdOrSmaller = useMediaQuery({ maxWidth: 768 });
  const onChange = (key) => {
    console.log(key);
  };
  
  useEffect(() => {
    dispatch({ type: TURN_ON });
    https
      .get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09")
      .then((res) => {
        settabMovie(res.data.content);
        dispatch({ type: TURN_OFF });
      })
      .catch((err) => {
        dispatch({ type: TURN_OFF });
      });
  }, []);

  const items = tabMovie.map((heThong, index) => {
    return {
      key: index,
      label: (
        <img
          className="w-16 transition duration-300 ease-in-out transform hover:scale-105"
          src={heThong.logo}
          alt=""
        />
      ),
      children: (
        <Tabs
          style={{
            height: 600,
          }}
          tabPosition={isMdOrSmaller ? "top" : "left"}
          items={heThong.lstCumRap.map((cumRap) => {
            {
              return {
                key: cumRap.diaChi,
                label: (
                  <div className=" w-60 text-red-500 transition duration-300 ease-in-out transform hover:scale-105">
                    <Tooltip title={cumRap.diaChi}>
                      <p>{cumRap.tenCumRap}</p>
                    </Tooltip>
                  </div>
                ),
                children: (
                  <div
                    style={{
                      height: isMdOrSmaller ? 500 : 600,
                    }}
                    className="space-y-5 py-2 overflow-y-scroll "
                  >
                    {cumRap.danhSachPhim.map((phim, index) => {
                      return (
                        <ItemMovie
                          isLoggedIn={isLoggedIn}
                          data={phim}
                          key={phim.maPhim}
                        />
                      );
                    })}
                  </div>
                ),
              };
            }
          })}
        />
      ),
    };
  });
  return (
    <div className=" lg:mx-40  border  ">
      <Tabs
        tabPosition={isMdOrSmaller ? "top" : "left"}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
