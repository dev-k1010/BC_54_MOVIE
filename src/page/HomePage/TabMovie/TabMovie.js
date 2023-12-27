import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie";
import { useDispatch } from "react-redux";
import { TURN_OFF, TURN_ON } from "../../../redux/constant/spinner";

export default function TabMovie() {
  const [tabMovie, settabMovie] = useState([]);
  let dispatch = useDispatch();
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
  const onChange = (key) => {
    console.log(key);
  };
  const items = tabMovie.map((heThong, index) => {
    return {
      key: index,
      label: <img className="w-16 transition duration-300 ease-in-out transform hover:scale-105" src={heThong.logo} alt="" />,
      children: (
        <Tabs
          style={{
            height: 600,
          }}
          tabPosition="left"
          items={heThong.lstCumRap.map((cumRap) => {
            {
              return {
                key: cumRap.diaChi,
                label: (
                  <div className="w-60 text-red-500 transition duration-300 ease-in-out transform hover:scale-105">
                    <Tooltip title={cumRap.diaChi}>
                      <p>{cumRap.tenCumRap}</p>
                    </Tooltip>
                  </div>
                ),
                children: (
                  <div
                    style={{
                      height: 600,
                    }}
                    className="space-y-5 overflow-y-scroll"
                  >
                    {cumRap.danhSachPhim.map((phim, index) => {
                      return <ItemMovie data={phim} key={phim.maPhim} />;
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
    <div className="mx-80 hidden md:hidden lg:block  border  ">
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
