import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity,DatePickerAndroid  } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {

  const [first_name,setFirstName]=useState('');
  const [last_name,setLastName]=useState('');
  const [gender, setGender] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState(null);


  const handleRegister = () => {

    if (isEmailValid(email)) {
      setError('Email is valid');
      return;
    }
    else{
      setError('Email is invalid');
      return;
    }
    
  };
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const isEmailValid = (email) => {
    const emailRegex =/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    return emailRegex.test(email);
  };

  

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={{fontSize:25, marginBottom:20,textAlign: 'center'}}>Register</Text>
      <TextInput
      placeholder='First Name'
      value={first_name}
      onChangeText={(text)=>setFirstName(text)}
      style={styles.input}></TextInput>
      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={(text) => setLastName(text)}
        style={styles.input}
      />

      <View style={styles.gender}>
      <Text >Choose Gender:</Text>
      <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
        <View style={{flexDirection: 'row'}}>
        <RadioButton value="male" /> 
        <Text>Male</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
         <RadioButton value="female" />
          <Text>Female</Text>
        </View>
      </RadioButton.Group>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirm_password}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
      />
       <View>
      <Text>DOB: {date.toDateString()}</Text>
      <View style={{marginBottom:20}}>
      <Button
        title="Select Date"
        onPress={() => setShowDatePicker(true)}
    
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

      
      <Button title="Register" onPress={handleRegister} />
      {error && <Text style={styles.error}>{error}</Text>} 
      <Text
        onPress={() => navigation.navigate('Login')}
        style={styles.link}
      >
        Already have an account? Login here.
      </Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  input: {
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10,
    backgroundColor:"#ccc"
  },
  link: {
    marginTop: 20,
    color: 'blue',
  },
  error: {
    color: 'red',
  },

});

export default RegisterScreen;



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
    
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={{fontSize:25, marginBottom:20}}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin}/>
//       <Text
//         onPress={() => navigation.navigate('Register')}
//         style={styles.link}
//       >
//         Don't have an account? Register here.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
    
//   },
//   input: {
//     width: '80%',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius:10,
//     backgroundColor:"#ccc"
//   },
//   link: {
//     marginTop: 20,
//     color: 'blue'
//   }
// });

// export default LoginScreen;
