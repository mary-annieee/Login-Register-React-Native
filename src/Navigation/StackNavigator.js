import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Stock from '../pages/StockRate';
import BottomNavigator from './BottomNavigator';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import Details from '../pages/Details';




const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Stock" component={Stock} />       
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />    
        <Stack.Screen name="Login" component={LoginScreen} />    
        <Stack.Screen name="Register" component={RegisterScreen} />    
        <Stack.Screen name="Details" component={Details} /> 
      </Stack.Navigator>
  );
};

export default StackNavigator;
