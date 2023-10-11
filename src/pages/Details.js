import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image,Alert} from 'react-native';
import {db} from '../utils/Database.js';
import Btn from '../components/Btn';
const Details = ({route,navigation}) => {
  const [user, setUser] = useState(null);
  const {userId} = route.params; 

  useEffect(() => {
    // Retrieve user details from the database based on user ID or email
    // Pass the user ID as a navigation parameter
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        (tx, results) => {
          const len = results.rows.length;
          if (len === 1) {
            const userData = results.rows.item(0);
            setUser(userData);
          }
        },
        error => {
          console.error('Error retrieving user data:', error);
        },
      );
    });
  }, [route.params]);

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM users where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'User deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid ID');
        }
      });
    });
  };
const handleLogout=()=>{
navigation.navigate('Login');
}
  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.text}>User Profile</Text>
          <Text style={styles.text}>First Name: {user.first_name}</Text>
          <Text style={styles.text}>Last Name: {user.last_name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Gender: {user.gender}</Text>
          <Text style={styles.text}>Date of Birth: {user.dob}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.belowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditTask', {
                      data: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        gender: user.gender,
                        dob: user.dob,
                      },
                    });
                  }}>
                  <Image
                    source={require('../assets/edit.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to delete the user?',
                      [
                        {
                          text: 'No',
                          style: 'cancel', // This option will close the alert
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            // Call the delete function here
                            deleteUser(user.id);
                          },
                        },
                      ],
                      { cancelable: false } // Prevent closing the alert by tapping outside of it
                    );
                  }}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
              <Btn
            
              textColor="white"
              bgColor="darkgreen"
              btnLabel="Logout"
              Press={handleLogout}
            />
            </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
  button:{
    marginTop:70,
  }
});
export default Details;
