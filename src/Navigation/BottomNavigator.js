import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CryptoScreen from '../pages/Crypto';
import DetailsScreen from '../pages/Details';

//Screen names
const homeName = 'Markets';
const detailsName = 'Details';

const Tab = createBottomTabNavigator();

function MainContainer() {
  
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === detailsName) {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={homeName}
        component={CryptoScreen}
        
      />
      <Tab.Screen
        name={detailsName}
        component={DetailsScreen}
        
      />
    </Tab.Navigator>
  );
}

export default MainContainer;
