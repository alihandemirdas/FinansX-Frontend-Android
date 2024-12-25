import React from "react";
import Svg, { Mask, Circle, G, Path } from "react-native-svg";

const TrFlag = ({ width = "100%", height = "100%" }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512">
      <Mask id="a">
        <Circle cx="256" cy="256" r="256" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Path fill="#d80027" d="M0 0h512v512H0z" />
        <G fill="#eee">
          <Path d="m350 182 33 46 54-18-33 46 33 46-54-18-33 46v-57l-54-17 54-18v-56Z" />
          <Path d="M260 370a114 114 0 1 1 54-215 141 141 0 1 0 0 202c-17 9-35 13-54 13Z" />
        </G>
      </G>
    </Svg>
  );
};

export default TrFlag;