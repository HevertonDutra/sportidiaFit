import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const DietIcon = ({ size = 40, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Fork */}
      <Path d="M100 140v240c0 8 7 15 18 15s18-7 18-15V140c0-8-7-15-18-15s-18 7-18 15z" fill={color}/>
      <Path d="M92 120h12v25h-12v-25z" fill={color}/>
      <Path d="M106 120h12v25h-12v-25z" fill={color}/>
      <Path d="M120 120h12v25h-12v-25z" fill={color}/>
      <Path d="M134 120h12v35h-12v-35z" fill={color}/>
      
      {/* Knife */}
      <Path d="M380 140v240c0 8 7 15 18 15s18-7 18-15V140c0-8-7-15-18-15s-18 7-18 15z" fill={color}/>
      <Path d="M390 120h25v25h-25v-25z" fill={color}/>
      
      {/* Plate with leaves */}
      <Circle cx="256" cy="256" r="85" fill="none" stroke={color} strokeWidth="10"/>
      <Circle cx="256" cy="256" r="65" fill="none" stroke={color} strokeWidth="6"/>
      
      {/* Leaves */}
      <Path d="M225 215c-18-12-40-6-45 18s12 40 30 35c10-4 15-12 18-25l-3-28z" fill={color}/>
      <Path d="M287 215c18-12 40-6 45 18s-12 40-30 35c-10-4-15-12-18-25l3-28z" fill={color}/>
      <Path d="M256 275c0-18-12-30-25-30s-25 12-25 30 18 35 25 30c4-4 25-18 25-30z" fill={color}/>
      <Path d="M281 275c0-18 12-30 25-30s25 12 25 30-18 35-25 30c-4-4-25-18-25-30z" fill={color}/>
    </Svg>
  );
};

export default DietIcon;