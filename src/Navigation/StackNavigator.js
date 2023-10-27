import React, { useEffect, useState  } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Stock from '../pages/Crypto';
import BottomNavigator from './BottomNavigator';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import Details from '../pages/Details';
import EditTask from '../pages/EditUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


const StackNavigator = ({ initialRouteName }) => {
  

//initialRouteName='Login'
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}} initialRouteName={initialRouteName}>
        
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
