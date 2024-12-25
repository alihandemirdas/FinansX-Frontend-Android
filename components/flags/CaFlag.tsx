import React from "react";
import Svg, { Mask, Circle, G, Path } from "react-native-svg";

const CaFlag = ({ width = "100%", height = "100%" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <Mask id="a">
        <Circle cx="256" cy="256" r="256" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        {/* Red Background with Shield Shape */}
        <Path fill="#d80027" d="M0 0v512h144l112-64 112 64h144V0H368L256 64 144 0Z" />
        {/* White Central Stripe */}
        <Path fill="#eee" d="M144 0h224v512H144Z" />
        {/* Decorative Pattern */}
        <Path
          fill="#d80027"
          d="m301 289 44-22-22-11v-22l-45 22 23-44h-23l-22-34-22 33h-23l23 45-45-22v22l-22 11 45 22-12 23h45v33h22v-33h45z"
        />
      </G>
    </Svg>
  );
};

export default CaFlag;
