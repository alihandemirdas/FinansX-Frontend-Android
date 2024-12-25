import React from "react";
import Svg, { Mask, Circle, G, Path } from "react-native-svg";

const ChFlag = ({ width = "100%", height = "100%" }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512">
      <Mask id="a">
        <Circle cx="256" cy="256" r="256" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        {/* Red Background */}
        <Path fill="#d80027" d="M0 0h512v512H0z" />
        {/* White Cross */}
        <Path fill="#eee" d="M389.6 211.5h-89v-89h-89.1v89h-89v89h89v89h89v-89h89z" />
      </G>
    </Svg>
  );
};

export default ChFlag;
