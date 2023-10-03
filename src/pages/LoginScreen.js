import React, {useState} from 'react';
//hello
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import Field from '../components/Feild';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorPass, setErrorPass] = useState(null);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Feild cannot be empty');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid Email');
    } else if (password.length < 6) {
      Alert.alert('Error', 'Mininum length is 6 character');
    } else {
      Alert.alert('Welcome', 'Logged In');
      navigation.navigate('Home');
    }
  };
  function validateEmail(email) {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  }

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
