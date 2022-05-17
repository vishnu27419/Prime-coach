import React from "react";
import Lottie from "react-lottie";
// import wsLoader from "assets/lottieFile/wsLoader.json";
import Thankou from "Custom/js/lottiAnimation/Thankyou4.json";

export default function ThankyouResponseLotti({
  height,
  width,
  loaderType,
  loaderFile,
  text,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: loaderFile ?? (loaderType === 1 && pcLoader),
    animationData: Thankou,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height ?? 250}
        width={width ?? 250}
      />
    </div>
  );
}
