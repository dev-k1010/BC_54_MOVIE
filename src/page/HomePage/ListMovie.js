import React, { useEffect, useRef, useState } from "react";
import { Card, Spin } from "antd";
import { https } from "../../service/config";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { TURN_ON, TURN_OFF } from "../../redux/constant/spinner";

const { Meta } = Card;

export default function ListMovie() {
  const dispatch = useDispatch();
  const [movieArr, setMovieArr] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  useEffect(() => {
    dispatch({
      type: TURN_ON,
    });
    https("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
      .then((res) => {
        setMovieArr(res.data.content);
        dispatch({
          type: TURN_OFF,
        });
      })
      .catch((err) => {
        console.log("🙂 ~ useEffect ~ err:", err);
      });

    if (slider1.current && slider2.current) {
      setNav1(slider1.current);
      setNav2(slider2.current);
    }
  }, [slider1.current, slider2.current]);

  const SampleArrow = ({ className, style, onClick, content, position }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        content: content,
        [position]: 0,
        zIndex: position === "left" ? 1 : undefined,
      }}
      onClick={onClick}
    />
  );
  
  const settings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: 6,
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <SampleArrow content=">" position="right" />,
    prevArrow: <SampleArrow content="<" position="left" />,
    responsive: [
      { breakpoint: 1025, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };
  const MovieImage = ({ src, alt }) => (
    <img
      className="h-full w-52 object-cover max-h-[40vh]  "
      src={src}
      alt={alt}
    />
  );


  
  const renderNavLink = (to, text) => (
    <NavLink
      to={to}
      className=" py-2 text-center  bg-slate-700 text-gray-200 mx-3 overflow-hidden block rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
    >
      {text}
    </NavLink>
  );

  //  ? isMovieCard = true => render nav1 : render nav2
  const renderCard = (movie, isMovieCard = false) => (
    <div key={movie.maPhim} className="flex md:hidden py-4">
      <Card
        hoverable
        className={`max-h-[70vh] mx-2 ${
          isMovieCard
            ? "transition duration-300 ease-in-out transform hover:scale-105"
            : ""
        }`}
      >
        {isMovieCard ? (
          <div className="py-3">
            <div className="mb-2 flex items-center justify-center h-[40vh]">
              <MovieImage src={movie.hinhAnh} alt="" />
            </div>
            <div className="space-y-4 text-center mx-auto">
              <Meta className="whitespace-normal" title={movie.tenPhim} />
              {renderNavLink(`/detail/${movie.maPhim}`, "Xem chi tiết")}
            </div>
          </div>
        ) : (
          <div className="flex space-x-5 p-2">
            <MovieImage src={movie.hinhAnh} alt="" />
            <div className="text-lg overflow-x-auto max-h-[300px]">
              <span>{movie.moTa}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <div>
      {/* nav1 */}
      <Slider className="bg-black w-full md:w-auto " {...settings}>
        {movieArr.map((movie) => renderCard(movie, true))}
      </Slider>

      {/* nav2 */}
      <Slider
        className="mx-0 lg:mx-80"
        asNavFor={nav2}
        ref={slider1}
        arrows={""}
      >
        {movieArr.map((movie) => renderCard(movie))}
      </Slider>
    </div>
  );
}
