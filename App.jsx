import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import HomeScreen from './src/pages/Home';
import { List } from 'react-native-paper';
import ListScreen from './src/pages/List';
import AddNewTask from './src/pages/AddNewTask';
import EditTask from './src/pages/EditTask';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="AddNewProduct" component={AddNewTask} />
        <Stack.Screen name="EditProduct" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
