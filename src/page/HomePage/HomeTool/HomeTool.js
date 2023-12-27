import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    NativeSelect,
  } from "@material-ui/core";
  import axios from "axios";
  import moment from "moment";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { useHistory } from "react-router-dom";
  import Swal from "sweetalert2";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "block",
      height: theme.spacing(10),
      position: "absolute",
      width: "100%",
      left: "50%",
      bottom: "0",
      transform: "translate(-50%,50%)",
    },
    homeToolContainer: {
      backgroundColor: theme.palette.common.white,
      borderRadius: "5px",
      zIndex: "2",
      boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
      height: "100%",
    },
    nativeSelect: {
      "&:before": {
        content: "unset",
      },
  
      display: "flex",
      justifyContent: "space-around",
      height: "100%",
  
      fontSize: "16px",
      fontWeight: 500,
      padding: "20px",
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    selectFilm: {
      flexGrow: "1",
      height: "100%",
    },
    selectCinema: {
      flexGrow: "1",
      height: "100%",
    },
    selectDate: {
      flexGrow: "1",
      height: "100%",
    },
    selectSession: {
      flexGrow: "1",
      height: "100%",
    },
    buyContainer: {
      flexGrow: "1",
      height: "100%",
    },
    formControl: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      position: "relative",
      "&:after": {
        position: "absolute",
        display: "block",
        content: "''",
        height: "60%",
        width: "1px",
        backgroundColor: theme.palette.grey[200],
      },
    },
    divider: {
      position: "relative",
      height: "60%",
  
      top: 0,
      transform: "translateY(30%)",
      opacity: "0.6",
    },
    button: {
      padding: "10px",
      margin: "0 10px",
    },
  }));
  
  export default function HomeTool() {
    const classes = useStyles();
    const history = useHistory();
    //   Mã
    const [film, setFilm] = useState("");
    const [cinema, setCinema] = useState("");
    const [date, setDate] = useState("");
  
    const [cinemaByMovie, setCinemaByMovie] = useState(null);
    // const [clusterByCinema, setClusterByCinema] = useState(null);
    // const [calenderByCluster, setCalenderByCluster] = useState(null);
  
    const movieList = useSelector((state) => state.movieListReducer);
  
    const handleChangeFilm = (event) => {
      setFilm(event.target.value);
      setCinema("");
      setDate("");
      axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim`,
        method: "GET",
        params: {
          MaPhim: event.target.value,
        },
      })
        .then((result) => {
          setCinemaByMovie(result.data.heThongRapChieu);
        })
        .catch((error) => {
          setCinemaByMovie(error);
        });
    };
    const handleChangeCinema = (event) => {
      setDate("");
      setCinema(event.target.value);
    };
    const handleChangeDate = (event) => {
      setDate(event.target.value);
    };
  
    const handleMuaVe = () => {
      if (film === "") {
        Swal.fire({
          title: "Bạn chưa chọn phim",
          text: "Vui lòng chọn phim",
          confirmButtonText: "Đã hiểu",
          confirmButtonColor: "#fb4226",
        });
      } else if (cinema === "") {
        Swal.fire({
          title: "Bạn chưa chọn rạp",
          text: "Vui lòng chọn rạp",
          confirmButtonText: "Đã hiểu",
          confirmButtonColor: "#fb4226",
        });
      } else if (date === "") {
        Swal.fire({
          title: "Bạn chưa chọn ngày giờ chiếu",
          text: "Vui lòng chọn ngày giờ chiếu",
          confirmButtonText: "Đã hiểu",
          confirmButtonColor: "#fb4226",
        });
      } else {
        history.push(`/purchase/${date}`);
      }
    };
  
    const renderFilm = (arr) => {
      return arr.map((item) => {
        return (
          <option key={item.maPhim} value={item.maPhim}>
            {item.tenPhim}
          </option>
        );
      });
    };
  
    const renderCinema = (arr) => {
      return arr.map((item) => {
        return item.cumRapChieu.map((childItem, childIndex) => {
          return (
            <option key={childItem.maCumRap} value={childItem.maCumRap}>
              {childItem.tenCumRap}
            </option>
          );
        });
      });
    };
  
    const renderDate = (arr) => {
      return arr.map((item) => {
        return item?.cumRapChieu?.map((childItem, childIndex) => {
          if (childItem.maCumRap === cinema) {
            return childItem.lichChieuPhim.map((data) => {
              return (
                <option key={data.maLichChieu} value={data.maLichChieu}>
                  {moment(data.ngayChieuGioChieu).format("DD/MM/YYYY ~ HH:mm")}
                </option>
              );
            });
          }
          return null;
        });
      });
    };
  
    return (
      <Container id="homeTool" className={classes.root} maxWidth="md">
        <Grid container className={classes.homeToolContainer}>
          <Grid item xs={4} className={classes.gridItem}>
            <div className={classes.selectFilm}>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={film}
                  name="film"
                  onChange={handleChangeFilm}
                  className={classes.nativeSelect}
                >
                  <option value="" disabled>
                    Phim
                  </option>
                  {movieList.data && renderFilm(movieList.data)}
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
  
          <Grid item xs={3}>
            <div className={classes.selectCinema}>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={cinema}
                  name="cinema"
                  onChange={handleChangeCinema}
                  className={classes.nativeSelect}
                >
                  <option value="" disabled>
                    Rạp
                  </option>
                  {cinemaByMovie && renderCinema(cinemaByMovie)}
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
  
          <Grid item xs={3}>
            <div className={classes.selectDate}>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={date}
                  name="date"
                  onChange={handleChangeDate}
                  className={classes.nativeSelect}
                >
                  <option value="" disabled>
                    Ngày giờ chiếu
                  </option>
                  {cinemaByMovie && cinema && renderDate(cinemaByMovie)}
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
  
          <Grid item xs={2}>
            <div className={classes.buyContainer}>
              <FormControl className={classes.formControl}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleMuaVe}
                >
                  MUA VÉ NGAY
                </Button>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
  