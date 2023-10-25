import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../pages/StockRate';
import DetailsScreen from '../pages/Details';

//Screen names
const homeName = 'Markets';
const detailsName = 'Details';

const Tab = createBottomTabNavigator();

function MainContainer({route}) {
  const {userId} = route.params;
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
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        initialParams={{userId}}
      />
      <Tab.Screen
        name={detailsName}
        component={DetailsScreen}
        initialParams={{userId}}
      />
    </Tab.Navigator>
  );
}

export default MainContainer;
