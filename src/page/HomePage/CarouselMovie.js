import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { https } from "../../service/config";
import { Element } from "rc-banner-anim";
import "rc-banner-anim/assets/index.css";

const contentStyle = {
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default function CarouselMovie() {
  const [carouselMovie, setcarouselMovie] = useState([]);

  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachBanner")
      .then((res) => {
        setcarouselMovie(res.data.content);
      })
      .catch((err) => {
        console.log("🙂 ~ useEffect ~ err:", err);
      });
  }, []);

  const renderImg = () => {
    return carouselMovie.map((item, index) => (
      <div key={index}>
        <div
          className="w-full h-[50vw] md:h-[60vw] lg:h-[80vh] "
          style={{
            ...contentStyle,
            backgroundImage: `url(${item.hinhAnh})`,
          }}
        />
      </div>
    ));
  };

  return (
    <div className="relative mt-20 mb-10 z-0">
      <Carousel className="" autoplay>
        {renderImg()}
      </Carousel>
    </div>
  );
}
