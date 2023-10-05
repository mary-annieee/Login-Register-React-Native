import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'UserDatabase.db'});

const Home = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM taskDB', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTaskList(temp);
      });
    });
  };
  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM taskDB where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Task deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => {
                  getData();
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
  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.taskItem}>
              <Text style={styles.itemText}>{'Priority: ' + item.priority}</Text>
              <Text style={styles.itemText}>{'Task: ' + item.task_name}</Text>
              <Text style={styles.itemText}>
                {'Description: ' + item.description}
              </Text>
              <View style={styles.belowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditTask', {
                      data: {
                        priority: item.priority,
                        task_name: item.task_name,
                        description: item.description,
                        id: item.id,
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
                    deleteUser(item.id);
                  }}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewTask');
        }}>
        <Text style={styles.btnText}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    backgroundColor: 'darkgreen',
    width: 150,
    height: 50,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  taskItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
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
});
