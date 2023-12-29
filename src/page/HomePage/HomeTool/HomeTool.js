import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { https } from "../../../service/config";

const HomeTool = () => {
  // Danh sách phim
  const [movieArr, setMovieArr] = useState([]);
  // Danh sách rạp
  const [cinemas, setCinemas] = useState([]);
  // Chọn phim
  const [selectedMovie, setSelectedMovie] = useState(null);
  // Chọn rạp
  const [selectedCinema, setSelectedCinema] = useState(null);
  // Chọn ngày giờ chiếu
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    https("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
      .then((res) => {
        setMovieArr(res.data.content);
      })
      .catch((err) => {});
  }, []);

  // Chọn phim
  const handleMovieChange = (selectedMovieId) => {
    const movie = movieArr.find((movie) => movie.maPhim === selectedMovieId);
    setSelectedMovie(movie);

    https(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${selectedMovieId}`)
      .then((res) => {
        setCinemas(res.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.error("Error fetching cinemas:", err);
      });
  };

  // Cập nhật lại tên rạp khi chọn một rạp khác
  const handleCinemaChange = (selectedCinemaId) => {
    setSelectedCinema(selectedCinemaId);
    const selectedCumRapArray = JSON.parse(selectedCinemaId);

    // Truyền giá trị lichChieuPhim cho selectedDate
    // Sửa từ ngayChieuJson thành ngayChieu

    setSelectedDate(selectedCumRapArray);
  };
  console.log("🙂 ~ HomeTool ~ selectedDate:", selectedDate);

  // Không cần hàm handleDateChange vì đã sử dụng selectedDate trực tiếp

  return (
    <Space wrap>
      <Select
        defaultValue={""}
        style={{
          width: 120,
        }}
        onChange={handleMovieChange}
        options={movieArr.map((movie) => ({
          label: movie.tenPhim,
          value: movie.maPhim,
        }))}
      />

      {cinemas && (
        <Select
          defaultValue={""}
          style={{
            width: 120,
          }}
          value={selectedCinema}
          onChange={handleCinemaChange}
          options={cinemas.map((heThongRap) => ({
            label: heThongRap.tenHeThongRap,
            value: JSON.stringify(heThongRap.cumRapChieu),
          }))}
        />
      )}

      {selectedDate && (
        <Select
          defaultValue={""}
          style={{
            width: 120,
          }}
          value={selectedDate}
          // options={selectedDate.map((lichChieu) => ({
          //   label: lichChieu,
          //   value: lichChieu,
          // }))}
        />
      )}
    </Space>
  );
};

export default HomeTool;
