import React from "react";
import Lottie from "react-lottie";
// import wsLoader from "assets/lottieFile/wsLoader.json";
import dumbell from "Custom/js/lottiAnimation/dumbel.json";

// import wsLoader2 from "assets/lottieFile/BasicLoader2.json";

export default function Dembel({
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
    animationData: dumbell,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height ?? 50}
        width={width ?? 50}
      />
    </div>
  );
}
