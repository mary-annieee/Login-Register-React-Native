import { useEffect } from "react";
import { View, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Splash=({navigation})=>{
  
    useEffect(() => {
        // Check if a user session exists in AsyncStorage.
        AsyncStorage.getItem('userId')
          .then(userId => {
            if (userId) {
              // User is authenticated; set the initial route to your home screen.
              navigation.replace("BottomNavigator")
            }
            else{
                navigation.replace("Login")
            }
          })
          .catch(error => {
            console.error('Error checking user session:', error);
          });
      }, []);

    return(
        <View>
        </View>
    );
};