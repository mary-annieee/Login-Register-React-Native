import React, { useState,useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigator';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [initialRoute, setInitialRoute] = useState('Login'); // Default to Login screen

  useEffect(() => {
    // Check if a user session exists in AsyncStorage.
    AsyncStorage.getItem('userId')
      .then(userId => {
        if (userId) {
          // User is authenticated; set the initial route to your home screen.
          setInitialRoute('Home');
        }
      })
      .catch(error => {
        console.error('Error checking user session:', error);
      });
  }, []);

  return (
    <NavigationContainer >
      <StackNavigation  initialRouteName={initialRoute}/>
    </NavigationContainer>
  );
};

export default App;
