import React from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";

export default function Spinner() {
  let isLoading = useSelector((state) => {
    return state.spinnerReducer.isLoading;
  });
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RingLoader size={100} speedMultiplier={2} color="#36d7b7" />;
    </div>
  ) : (
    <> </>
  );
}
