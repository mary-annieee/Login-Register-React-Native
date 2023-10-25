import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {openDatabase} from 'react-native-sqlite-storage';
  import {useNavigation, useRoute} from '@react-navigation/native';

  let db = openDatabase({name: 'mydb.db'});

  const EditUser = () => {
    const route = useRoute();
    console.log(route.params.data);
 const navigation = useNavigation();
    const [first_name, setFirstName] = useState(route.params.data.first_name);
    const [last_name, setLastName] = useState(route.params.data.last_name);
    const [email, setEmail] = useState(route.params.data.email);
    const [gender, setGender] = useState(route.params.data.gender);
    const [dob, setDob] = useState(route.params.data.dob);
    
    
    const updateUser = () => {
      console.log(first_name,last_name,gender,email,dob);
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET first_name=?, last_name=?,gender=?,email=?,dob=? WHERE id=?',
          [first_name, last_name,gender,email,dob, route.params.data.id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Task updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('BottomNavigator',{ userId: route.params.data.id}),
                  },
                ],
                {cancelable: false},
              );
            } else {Alert.alert('Updation Failed');}
          },
          (error) => {
            console.error('Error updating user details:', error);
            Alert.alert('Error', 'Failed to update user details');
          }
        );
      });
    };

    useEffect(() => {
      setFirstName(route.params.data.first_name);
      setLastName(route.params.data.last_name);
      setEmail(route.params.data.email);
      setGender(route.params.data.gender);
      setDob(route.params.data.dob);
    }, []);
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter User Name"
          style={styles.input}
          value={first_name}
          onChangeText={txt => setFirstName(txt)}
        />
        <TextInput
          placeholder="Enter User Email"
          value={last_name}
          onChangeText={txt => setLastName(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TextInput
          placeholder="Enter User Address"
          value={email}
          onChangeText={txt => setEmail(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TextInput
          placeholder="Enter User Address"
          value={gender}
          onChangeText={txt => setGender(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TextInput
          placeholder="Enter User Address"
          value={dob}
          onChangeText={txt => setDob(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            updateUser();
          }}>
          <Text style={styles.btnText}>Save User</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default EditUser;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      width: '80%',
      height: 50,
      borderRadius: 10,
      borderWidth: 0.3,
      alignSelf: 'center',
      paddingLeft: 20,
      marginTop: 100,
    },
    addBtn: {
      backgroundColor: 'darkgreen',
      width: '80%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      alignSelf: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: 18,
    },
  });