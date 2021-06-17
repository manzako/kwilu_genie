import React from "react";
import Lottie from "lottie-react-web";
import animation from "../assets/1708-success.json";

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400}/>;
};

export default SuccessAnimation;
