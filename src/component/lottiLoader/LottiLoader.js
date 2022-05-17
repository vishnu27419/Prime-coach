import React from "react";
import Lottie from "react-lottie";
// import wsLoader from "assets/lottieFile/wsLoader.json";
import noDataAvalable from "Custom/js/lottiAnimation/noDataAvalablePrimeCoach.json";

// import wsLoader2 from "assets/lottieFile/BasicLoader2.json";

export default function NoDataFound({
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
    animationData: noDataAvalable,
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
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
          fontWeight: "bolder",
          color: "#1572FF",
        }}
      >
        {text}
      </p>
    </div>
  );
}
