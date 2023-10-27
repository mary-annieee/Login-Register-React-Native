import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image,Alert,Modal,TextInput} from 'react-native';
import Btn from '../components/Btn';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Details = ({navigation}) => {
  let db = openDatabase({name: 'mydb.db'});
  const [user, setUser] = useState({});
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const {userId} = route.params; 
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };
  const saveEditedUser = () => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET first_name=?,last_name=?,email=? WHERE id=?',
          [first_name,last_name,email,user.id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Task updated successfully',
              );
            } else {Alert.alert('Updation Failed');}
          },
          (error) => {
            console.error('Error updating user details:', error);
            Alert.alert('Error', 'Failed to update user details');
          }
        );
      });
    toggleEditModal();
  };
  

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then(userId => {
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
  });
  });

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
  AsyncStorage.removeItem('userId')
  .then(() => {
    navigation.navigate('Login');
  })
  .catch(error => {
    console.error('Error clearing user session:', error);
    navigation.navigate('Login');
  });
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
                    setFirstName(user.first_name); 
                    setLastName(user.last_name);
                    setEmail(user.email);
                    toggleEditModal()
                  }}>
                  <Image
                    source={require('../assets/edit.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                
                <Modal
      visible={isEditModalVisible}
      transparent={true}
      animationType="slide">
      <View style={styles.modalContainer}>
       
        <View style={{backgroundColor:'white',height:300,width:'90%',padding:30,borderRadius:10}}>
        <Text>Edit User Details</Text>
        <TextInput
          placeholder="First Name"
          value={first_name}
          onChangeText={(text) => setFirstName(text)}
        />
         <TextInput
          placeholder="Last Name"
          value={last_name}
          onChangeText={txt => setLastName(txt)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
       
        <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.button1}
    onPress={saveEditedUser}
  >
    <Text style={{color:'white'}}>Save</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.button1}
    onPress={toggleEditModal}
  >
    <Text style={{color:'white'}}>Cancel</Text>
  </TouchableOpacity>
</View>
        </View>
      </View>
    </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button1: {
    backgroundColor: 'darkgreen', // You can set your desired background color
    padding: 10,
    margin: 5,
    
  },
});
export default Details;
