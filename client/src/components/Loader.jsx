/* eslint-disable react/prop-types */
import { Player } from "@lottiefiles/react-lottie-player";

const Loader = ({
  json = "https://lottie.host/61fe84c3-4647-499e-9088-8f0048d8da38/nrbwEX3FdD.json",
  height = "500px",
  width = "500px",
}) => {
  return (
    <div className="">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black-600 backdrop-blur-sm">
        <Player
          src={json}
          background="transparent"
          speed="1"
          style={{ height: height , width: width }}
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loader;
