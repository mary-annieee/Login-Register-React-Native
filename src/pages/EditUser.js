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

  let db = openDatabase({name: 'UserDatabase.db'});

  const EditTask = () => {
    const route = useRoute();
    console.log(route.params.data);
 const navigation = useNavigation();
    const [priority, setPriority] = useState(route.params.data.first_name);
    const [task_name, setTaskName] = useState(route.params.data.last_name);
    const [description, setDescription] = useState(route.params.email);
    
    const updateUser = () => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users set first_name=?, last_name=? , email=? where id=?',
          [priority, task_name, description, route.params.data.id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Task updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Details'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Updation Failed');
          },
        );
      });
    };
    useEffect(() => {
      setPriority(route.params.data.first_name);
      setTaskName(route.params.data.last_name);
      setDescription(route.params.data.email);
    }, []);
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter User Name"
          style={styles.input}
          value={priority}
          onChangeText={txt => setPriority(txt)}
        />
        <TextInput
          placeholder="Enter User Email"
          value={task_name}
          onChangeText={txt => setTaskName(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TextInput
          placeholder="Enter User Address"
          value={description}
          onChangeText={txt => setDescription(txt)}
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
  
  export default EditTask;
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