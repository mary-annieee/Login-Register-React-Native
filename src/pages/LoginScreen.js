import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import Field from '../components/Feild';
import {db} from '../utils/Database';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorPass, setErrorPass] = useState(null);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Feild cannot be empty');
    } else {
      verifyUserLogin(
        email,
        password,
        user => {
          Alert.alert('Welcome', 'Logged In');
          // Navigate to the home screen or perform other actions as needed
          navigation.navigate('Home', {userId: user.id});
        },
        error => {
          setError(error);
        },
      );
    }
  };
  const verifyUserLogin = (email, password, onSuccess, onError) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (tx, results) => {
          const len = results.rows.length;
          if (len === 1) {
            const user = results.rows.item(0);
            if (user.password === password) {
              // Passwords match, user is authenticated
              onSuccess(user);
            } else {
              // Passwords do not match
              onError('Invalid password');
            }
          } else {
            // No user with the given email found
            onError('User not found');
          }
        },
        error => {
          console.error('Error verifying user login:', error);
          onError('An error occurred while verifying login');
        },
      );
    });
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: 380}}>
        <Text
          style={{
            color: '#defade',
            fontSize: 40,
            fontWeight: 'bold',
            marginVertical: 40,
            marginRight: 20,
          }}>
          Login
        </Text>

        <View
          style={{
            backgroundColor: 'rgba(222,250,222,0.6)',
            height: 440,
            width: 330,
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            borderBottomLeftRadius: 70,
            borderBottomRightRadius: 70,
            paddingTop: 40,
            alignItems: 'center',
            marginRight: 20,
          }}>
          <Text style={{fontSize: 30, color: 'darkgreen', fontWeight: 'bold'}}>
            Welcome
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <View style={{marginRight: 70}}>
            {error && <Text style={{color: 'red', fontSize: 12}}>{error}</Text>}
          </View>

          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {errorPass && (
            <Text style={{color: 'red', fontSize: 12}}>{errorPass}</Text>
          )}

          <View>
            <Btn
              textColor="white"
              bgColor="darkgreen"
              btnLabel="Login"
              Press={handleLogin}
            />
            {/* Press={() => alert("Logged In")}  */}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{color: 'darkgreen', fontWeight: 'bold', fontSize: 14}}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
