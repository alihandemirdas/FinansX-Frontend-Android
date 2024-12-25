import React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow = ({ width = 24, height = 24, color = "white" }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
      />
    </Svg>
  );
};

export default Arrow;
