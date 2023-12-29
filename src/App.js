import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import DetailPage from "./page/DetailPage/DetailPage";
import HomePlayout from "./Playout/HomePlayout";
import Spinner from "./components/Spinner/Spinner";
import BookingPage from "./page/BookingPage/BookingPage";

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePlayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:idPhim" element={<DetailPage />} />
            <Route path="/booking/:idPhim" element={<BookingPage />} />
          </Route>
          {/*  */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
