import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground source={require("../assets/leaves3.jpg")} style={{ height:1000}} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
    
  );
}

export default Background;