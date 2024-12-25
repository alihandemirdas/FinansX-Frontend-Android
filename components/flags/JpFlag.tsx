import React from "react";
import Svg, { Mask, Circle, G, Path } from "react-native-svg";

const JpFlag = ({ width = "100%", height = "100%" }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512">
      <Mask id="a">
        <Circle cx="256" cy="256" r="256" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        {/* Background */}
        <Path fill="#eee" d="M0 0h512v512H0z" />
        {/* Red Circle */}
        <Circle cx="256" cy="256" r="111.3" fill="#d80027" />
      </G>
    </Svg>
  );
};

export default JpFlag;
