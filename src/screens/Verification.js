import {StyleSheet, View, Modal, TouchableOpacity, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import MyButton from '../component/MyButton';
import {TextInput, Text} from 'react-native';
import axios from 'axios'; // Ensure axios is imported
import LoadingModal from '../component/LoadingModal';
const Verification = ({navigation, route}) => {
  const email = route?.params?.email;
  const [modalVisible, setModalVisible] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Create refs for the TextInput components
  const refs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const validateOtp = otp => /^\d{4}$/.test(otp.join(''));

  const handleResetNowPress = async () => {
    if (!validateOtp(otp)) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/verify-otpApp',
        {email, enteredOtp: otp.join('')},
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.data.success) {
        navigation.navigate('ChangePassword', {
          email,
        });
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      alert('OTP Invalid, Please try again');
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (index, value) => {
    if (/[^0-9]/.test(value)) return; // If non-numeric character, do nothing

    otp[index] = value;

    if (index < otp.length - 1 && value !== '') {
      // Focus the next field if it's not the last one
      refs.current[index + 1].current.focus();
    }

    setOtp([...otp]);
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
      <Text style={styles.login}>Verification</Text>
      <View style={{width: '90%', margin: 10}}>
        <Text style={styles.signin}>
          We’ve send you the verification code on your email.
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder="-"
            placeholderTextColor={'#000000'}
            keyboardType="numeric"
            value={d}
            maxLength={1}
            onChangeText={value => handleChangeText(i, value)}
            ref={refs.current[i]}
          />
        ))}
      </View>
      <MyButton
        title={'Reset Now'}
        onPress={handleResetNowPress} // Call the new handler function
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.bView}>
              <Text style={styles.modalText}>Password Reset Email Send</Text>
            </View>
            <View style={styles.tView}>
              <Text style={styles.txt}>
                An email has been sent to you Follow direction in the email to
                reset password
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.btnText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Verification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  input: {
    width: '16%',
    margin: 12,
    borderColor: '#4F4F4F54',
    color: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    padding: 18,
    textAlign: 'center',
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
    fontWeight: '400',
    lineHeight: 21.2,
    fontFamily: 'MartelSans-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000094',
  },
  modalView: {
    width: '92%',
    height: '35%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'MartelSans-SemiBold',
  },
  bView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#3F6EEC',
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  tView: {
    width: '70%',
    padding: 20,
  },
  txt: {
    fontSize: 14,
    color: '#777777',
    lineHeight: 21.2,
    textAlign: 'center',
    padding: 10,
  },
  btn: {
    width: '65%',
    backgroundColor: '#3F6EEC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 5,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'MartelSans-SemiBold',
    fontWeight: '400',
  },
});
