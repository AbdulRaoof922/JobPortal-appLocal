import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MyButton from '../component/MyButton';
import {TextInput, Text} from 'react-native-paper';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleForgotPassword = () => {
    if (validateEmail(email)) {
      setIsEmailValid(true);
      // If email is valid, navigate or perform other logic
      checkEmail(email);
    } else {
      setIsEmailValid(false);
      // If email is invalid, set the state accordingly to show visual feedback
    }
  };

  const checkEmail = async email => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      // Construct the URL
      const url = `https://ill-pear-basket-clam-tie.cyclic.cloud/check-emailApp`;

      // Send a POST request to the API endpoint with the email as data
      const response = await axios.post(
        url,
        {email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Handle response accordingly
      navigation.navigate('Verification', {
        email: email,
      });

      // Return the response data to be used by function callers
      return response.data;
    } catch (error) {
      // Handle error accordingly
      console.error('Error checking email:', error);

      // Optionally, return something to indicate an error
      return null;
    } finally {
      setLoading(false); // Reset loading status once fetching is complete
    }
  };
  return (
    <View style={styles.container}>
      <LoadingModal isVisible={loading} />
      <View
        style={{
          backgroundColor: '#3F6EEC',
          width: '22%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 50,
          marginBottom: 10,
        }}>
        <Text style={[styles.login, {color: '#ffffff', fontSize: 16}]}>
          LOGO
        </Text>
      </View>
      <Text style={styles.login}>Forgot Password</Text>
      <View style={{width: '90%', margin: 10}}>
        <Text style={styles.signin}>
          Please enter your email address to request a password reset
        </Text>
      </View>
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        style={[styles.input, !isEmailValid ? styles.invalidInput : null]}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 10}}
        placeholder="Johndoe@email.com"
        onChangeText={text => {
          setEmail(text);
          setIsEmailValid(true); // Reset validation when user types
        }}
      />
      {!isEmailValid && (
        <Text style={styles.errorText}>
          Please enter a valid email address.
        </Text>
      )}
      <MyButton title={'Forgot Password'} onPress={handleForgotPassword} />
    </View>
  );
};
export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#777777',
    height: 55,
    borderRadius: 200,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    width: '90%',
    textAlign: 'left',
    marginBottom: 10,
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
    textAlign: 'justify',
    lineHeight: 21.2,
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
