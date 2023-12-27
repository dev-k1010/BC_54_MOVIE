import React from "react";
import FormLogin from "./FormLogin";
import Lottie from "lottie-react";
import animateSrc from "./animationCat.json";
export default function LoginPage() {
  return (
    <div className="flex container items-center">
      <FormLogin />
      <div className="w-1/2">
        <Lottie animationData={animateSrc} loop={true} />
      </div>
    </div>
  );
}
