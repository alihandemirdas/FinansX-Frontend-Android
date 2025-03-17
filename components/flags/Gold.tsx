import React from "react";
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  RadialGradient,
  Stop,
  Text
} from "react-native-svg";

const GoldSVG = ({ width = "100%", height = "100%" }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <Defs>
        <RadialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#ffd700" />
          <Stop offset="50%" stopColor="#ffcc00" />
          <Stop offset="100%" stopColor="#d4af37" />
        </RadialGradient>
      </Defs>
      <G>
        {/* Outer Circle */}
        <Circle
          cx="256"
          cy="256"
          r="200"
          fill="url(#goldGradient)"
          stroke="#b8860b"
          strokeWidth="10"
        />

        {/* Inner Text */}
        <Text
          x="256"
          y="270"
          fontSize="64"
          fontWeight="bold"
          textAnchor="middle"
          fill="#b8860b"
        >
          ALTIN
        </Text>
      </G>
    </Svg>
  );
};

export default GoldSVG;
