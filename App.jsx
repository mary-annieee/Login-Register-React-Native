import React, { useState,useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigator';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // const [initialRoute, setInitialRoute] = useState('Login'); // Default to Login screen


  // const determineInitialRoute = async () => {

//   try {
//     const userId = await AsyncStorage.getItem('userId');
//     if (userId) {
//       return "BottomNavigator";
//     }
//   } catch (error) {
//     console.error('Error checking user session:', error);
//   }

//   return "Login";
// };


  // useEffect(() => {
  //   determineInitialRoute().then(routeName => {
  //     setInitialRoute(routeName);
  //   });
  // }, []);
  
  return (
    <NavigationContainer >
      <StackNavigation  />
    </NavigationContainer>
  );
};

export default App;
