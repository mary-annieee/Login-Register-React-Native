import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {db} from '../utils/Database.js';

const HomeScreen = ({route}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from the database based on user ID or email
    const {userId} = route.params; // Pass the user ID as a navigation parameter
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
  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.text}>User Profile:</Text>
          <Text style={styles.text}>First Name: {user.first_name}</Text>
          <Text style={styles.text}>Last Name: {user.last_name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Gender: {user.gender}</Text>
          <Text style={styles.text}>Date of Birth: {user.dob}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
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
});
export default HomeScreen;
