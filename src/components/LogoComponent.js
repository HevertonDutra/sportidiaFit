import React from 'react';
import Svg, { Circle, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const LogoComponent = ({ size = 80, isDark = false }) => {
  const primaryColor = isDark ? '#FF8C00' : '#007BFF';
  const secondaryColor = isDark ? '#FFA500' : '#17A2B8';
  
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} />
          <Stop offset="100%" stopColor={secondaryColor} />
        </LinearGradient>
      </Defs>
      <Circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      <SvgText
        x="50"
        y="35"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="white"
      >
        V+
      </SvgText>
      <SvgText
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="10"
        fill="white"
      >
        FIT
      </SvgText>
    </Svg>
  );
};

export default LogoComponent;