import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from '../components/Background';
import Btn from '../components/Btn';
import Field from '../components/Feild';
import {db, initializeDatabase} from '../../Database';

const RegisterScreen = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleLogin = () => {
    if (
      !first_name ||
      !last_name ||
      !gender ||
      !email ||
      !password ||
      !confirm_password
    ) {
      Alert.alert('Error', 'Field cannot be empty');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid Email');
    } else if (password.length < 6) {
      Alert.alert('Invalid Password', 'Mininum password length is 6 character');
    } else if (password != confirm_password) {
      Alert.alert('Error', "Password doesn't match");
    } else {
      // Insert user data into the SQLite database
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (first_name, last_name, gender, email, password, dob) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, gender, email, password, date.toDateString()],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Successfully signed up',
              'Enter the email and password to login'
            );
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', 'Registration failed');
          }
        },
        error => {
          console.error('Error inserting user data:', error);
          Alert.alert('Error', 'Registration failed');
        }
      );
    });
    }
  };

  function validateEmail(email) {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  }

  const handleGenderChange = selectedGender => {
    setGender(selectedGender);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View>
      <ScrollView>
        <Background>
          <View style={{alignItems: 'center', width: 380}}>
            <Text
              style={{
                color: '#defade',
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 15,
                marginRight: 20,
              }}>
              Register
            </Text>
            <Text
              style={{
                color: '#defade',
                fontSize: 17,
                marginRight: 20,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              Create an new account
            </Text>

            <View
              style={{
                backgroundColor: 'rgba(222,250,222,0.7)',
                height: 810,
                width: 330,
                borderTopLeftRadius: 70,
                borderTopRightRadius: 70,
                borderBottomLeftRadius: 70,
                borderBottomRightRadius: 70,
                paddingTop: 20,
                alignItems: 'center',

                marginRight: 20,
              }}>
              <Field
                placeholder="First Name"
                value={first_name}
                onChangeText={text => setFirstName(text)}
              />
              <Field
                placeholder="Last Name"
                value={last_name}
                onChangeText={text => setLastName(text)}
              />

              <View style={{marginRight: 70, marginTop: 10}}>
                <Text>Choose Gender:</Text>
                <RadioButton.Group
                  onValueChange={handleGenderChange}
                  value={gender}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton value="male" />
                      <Text>Male</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton value="female" />
                      <Text>Female</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <Field
                placeholder="Email"
                keyboardType={'email-address'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              
              <Field
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
             
              <Field
                placeholder="Confirm Password"
                value={confirm_password}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
              />
              <View style={{marginTop: 20}}>
                <Text style={{marginLeft: 15}}>DOB: {date.toDateString()}</Text>
                <View style={{marginBottom: 20}}>
                  <Btn
                    textColor="white"
                    bgColor="darkgreen"
                    btnLabel="Select DOB"
                    Press={() => setShowDatePicker(true)}
                  />
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            
              <View>
                <Btn
                  textColor="white"
                  bgColor="darkgreen"
                  btnLabel="Sign up"
                  Press={handleLogin}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', marginBottom: 40}}>
                  Already have an account ?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: 'darkgreen',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Background>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
