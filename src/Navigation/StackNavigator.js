import React, { useEffect, useState  } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import BottomNavigator from './BottomNavigator';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import Splash from '../pages/Splash';


const Stack = createNativeStackNavigator();


const StackNavigator = () => {
//{initialRouteName}
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}} initialRouteName='Splash'>
        
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
