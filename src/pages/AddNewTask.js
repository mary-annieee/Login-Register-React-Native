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
  import {useNavigation} from '@react-navigation/native';
  let db = openDatabase({name: 'UserDatabase.db'});
  const AddNewTask = () => {
    const navigation = useNavigation();
    const [priority, setPriority] = useState('');
    const [task_name, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const saveUser = () => {
      console.log(priority, task_name,description);
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO taskDB (priority, task_name, description) VALUES (?,?,?)',
          [priority, task_name, description],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Your Task has been saved Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Failed to Save the Task');
          },
          error => {
            console.log(error);
          },
        );
      });
    };
    useEffect(() => {
        db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS taskDB (id INTEGER PRIMARY KEY AUTOINCREMENT, priority INTEGER, task_name TEXT, description VARCHAR)',
      [],
      (tx, results) => {
        console.log('Database initialized successfully');
      },
      error => {
        console.error('Error initializing database:', error);
      }
    );
  });
    }, []);
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter Task Priority"
          style={styles.input}
          value={priority}
          onChangeText={txt => setPriority(txt)}
        />
        <TextInput
          placeholder="Enter Task Name"
          value={task_name}
          onChangeText={txt => setTaskName(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TextInput
          placeholder="Enter Task Description"
          value={description}
          onChangeText={txt => setDescription(txt)}
          style={[styles.input, {marginTop: 20}]}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            saveUser();
          }}>
          <Text style={styles.btnText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AddNewTask;
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