import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DarkModeIcon = ({ size = 24, color = '#000', isDark = false }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 400 400" fill="none">
      <Path
        d="M200 50C283.28 50 350 116.72 350 200C350 283.28 283.28 350 200 350C116.72 350 50 283.28 50 200C50 150.5 70.5 105.8 103.2 73.8C115.5 84.2 130.8 90 147.5 90C195.5 90 235 129.5 235 177.5C235 225.5 195.5 265 147.5 265C99.5 265 60 225.5 60 177.5C60 160.8 65.8 145.5 76.2 133.2C62.8 155.5 55 181.2 55 208.5C55 286.8 118.2 350 196.5 350C274.8 350 338 286.8 338 208.5C338 130.2 274.8 67 196.5 67C181.2 67 166.5 69.8 152.8 74.8C169.8 59.2 192.2 50 216.5 50H200Z"
        fill={isDark ? '#FFFFFF' : color}
        stroke={isDark ? color : 'none'}
        strokeWidth={isDark ? 2 : 0}
      />
    </Svg>
  );
};

export default DarkModeIcon;