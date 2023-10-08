import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MyButton from '../component/MyButton';
import {TextInput, Text} from 'react-native-paper';
import Feather from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios'; // Ensure axios is imported
const ChangePassword = ({navigation, route}) => {
  const email = route?.params?.email;

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const validatePasswords = () => {
    if (!oldPassword || !password || !confirm) {
      Alert.alert('Error', 'All fields are required!');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters!');
      return false;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match!');
      return false;
    }
    return true;
  };

  const handleSaveNowPress = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      setLoading(true);
      // Define the API endpoint
      const url =
        'https://ill-pear-basket-clam-tie.cyclic.cloud/reset-passwordApp';

      // Define the request body
      const body = {
        email,
        password,
      };

      // Define the headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Make the POST request and await the response
      const response = await axios.post(url, body, {headers});
      setLoading(true);
      // Log the response for debugging purposes
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      // Return the response data to be used by function callers
      return response.data;
    } catch (error) {
      setLoading(true);
      alert("'Error resetting password:', error");
      // Log the error for debugging purposes
      console.error('Error resetting password:', error);

      // Optionally, return something to indicate an error
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#3F6EEC',
          width: '22%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <Text style={[styles.login, {color: '#ffffff', fontSize: 16}]}>
          LOGO
        </Text>
      </View>
      <Text style={styles.login}>Change Password</Text>
      <View style={{width: '90%', margin: 10}}>
        <Text style={styles.signin}>
          Please enter your email address to request a password reset
        </Text>
      </View>

      <TextInput
        label="Old Password"
        value={oldPassword}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 10}}
        secureTextEntry
        onChangeText={setOldPassword}
        right={
          <TextInput.Icon
            color={'#777777'}
            icon={() => (
              <Feather name={'eye-slash'} size={20} color="#777777" />
            )}
          />
        }
      />
      <TextInput
        label="Password"
        value={password}
        style={styles.input}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 10}}
        secureTextEntry
        mode="outlined"
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            color={'#777777'}
            icon={() => (
              <Feather name={'eye-slash'} size={20} color="#777777" />
            )}
          />
        }
      />
      <TextInput
        label="Re-enter Password"
        value={confirm}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 10}}
        secureTextEntry
        onChangeText={setConfirm}
        right={
          <TextInput.Icon
            color={'#777777'}
            icon={() => (
              <Feather name={'eye-slash'} size={20} color="#777777" />
            )}
          />
        }
      />
      <MyButton
        title={'Save Now'}
        onPress={handleSaveNowPress} // Updated onPress handler
      />
    </View>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 40,
  },
  input: {
    width: '90%',
    margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#ffffff',
    height: 55,
    borderRadius: 200,
  },
  login: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'ReadexPro-Regular',
  },
  signin: {
    color: '#000000',
    fontSize: 14,
    margin: 5,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
  },
  remember: {
    color: '#777777',
    fontSize: 14,
    margin: 5,
    fontFamily: 'MartelSans-Regular',
  },
  forget: {
    color: '#000000',
    fontSize: 14,
    margin: 5,
    fontFamily: 'MartelSans-Bold',
  },
});
