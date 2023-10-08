import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyButton from '../component/MyButton';
import {TextInput, Text} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import DescriptionBlock from '../component/DescriptionBlock';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {setSignUpFresher} from '../redux/Reducers/CommonReducer';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const SignUpDetailsFresher = ({navigation}) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isGenderValid, setIsGenderValid] = useState(true);
  const [isDocumentValid, setIsDocumentValid] = useState(true); // Added this state
  const [loading, setLoading] = useState(false);

  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
      });
      setDocument(result);
      ToastAndroid.show('Document uploaded', ToastAndroid.SHORT);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  // Options for gender dropdown
  const genderItems = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];
  const validateFields = () => {
    let isValid = true;

    if (!fullName) {
      setIsNameValid(false);
      isValid = false;
    }

    if (!mobileNumber) {
      setIsMobileNumberValid(false);
      isValid = false;
    }

    if (!emailId) {
      setIsEmailValid(false);
      isValid = false;
    } else {
      // Regular expression for validating an Email
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(emailId)) {
        setIsEmailValid(false);
        isValid = false;
      } else {
        setIsEmailValid(true);
      }
    }

    if (!password) {
      setIsPasswordValid(false);
      isValid = false;
    }

    if (!gender) {
      setIsGenderValid(false);
      isValid = false;
    }

    if (!document) {
      setIsDocumentValid(false);
      isValid = false;
    }

    if (!isValid) {
      // Show a Toast message
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }

    return isValid;
  };
  const validateEmail = async email => {
    try {
      // Define the API endpoint
      setLoading(true);

      const url =
        'https://ill-pear-basket-clam-tie.cyclic.cloud/validate-email';

      // Define the request body
      const body = {
        email, // Assuming API expects an email parameter
      };

      // Define the headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Make the POST request and await the response
      const response = await axios.post(url, body, {headers});

      // Log the response for debugging purposes
      setLoading(false);

      // Return the response data to be used by function callers
      return response.data;
    } catch (error) {
      setLoading(false);

      // Log the error for debugging purposes
      console.error('Error validating email:', error);

      // Optionally, return something to indicate an error
      return null;
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <LoadingModal isVisible={loading} />

      <ScrollView contentContainerStyle={styles.container}>
        <DescriptionBlock
          title="Sign up Details"
          description="please provide required information to sign up."
        />
        <TextInput
          label="Full Name"
          value={fullName}
          mode="outlined"
          outlineStyle={[!isNameValid && styles.invalid]}
          style={[styles.input]}
          placeholder="John Doe"
          onChangeText={text => setFullName(text)}
        />
        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          mode="outlined"
          keyboardType="number-pad"
          outlineStyle={[!isMobileNumberValid && styles.invalid]}
          style={[styles.input]}
          placeholder="+91 657888 77"
          onChangeText={text => setMobileNumber(text)}
        />
        <TextInput
          label="Email-id"
          value={emailId}
          outlineStyle={[!isEmailValid && styles.invalid]}
          mode="outlined"
          keyboardType="email-address"
          style={[styles.input]}
          placeholder="johndoe@gmail.com"
          onChangeText={text => setEmailId(text)}
        />
        <TextInput
          label="Create Password"
          value={password}
          mode="outlined"
          secureTextEntry={true}
          outlineStyle={[!isPasswordValid && styles.invalid]}
          style={[styles.input]}
          placeholder="********"
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={[
            styles.uploadBtn,
            {borderColor: !isDocumentValid ? 'red' : '#4E6BB8'},
          ]}
          onPress={pickDocument}>
          <Image style={styles.img} source={require('../assets/upload.png')} />
          <Text style={[styles.upload]}>
            {document ? 'Document uploaded' : 'Upload Resume'}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            {
              margin: 10,
              width: '90%',
              marginHorizontal: '5%',
              zIndex: 999,
            },
          ]}>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={gender}
            items={genderItems}
            placeholder="Gender"
            style={[
              styles.dropdown,
              {borderColor: !isGenderValid ? 'red' : 'gray'},
            ]}
            onSelectItem={item => {
              setGender(item.value);
            }}
            dropDownContainerStyle={{borderColor: 'gray'}} // Opened dropdown border color
            containerStyle={{borderColor: 'gray'}} // Closed dropdown border color
            zIndex={999}
          />
        </View>
        <MyButton
          title={'Continue'}
          onPress={async () => {
            if (validateFields()) {
              // Create an object of all fields
              const validationResult = await validateEmail(emailId);
              if (!validationResult?.emailExists) {
                const userObject = {
                  fullName,
                  mobileNumber,
                  emailId,
                  password,
                  gender,
                  document,
                };
                // Dispatch the object
                dispatch(setSignUpFresher(userObject));
                navigation.navigate('SignUpEducationDetailsFresher');
              } else {
                alert(
                  'This email is already registered. Please use other email.',
                );
              }
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpDetailsFresher;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  input: {
    width: '90%',
    margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 10,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4E6BB8',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '90%',
    justifyContent: 'center',
  },
  upload: {
    marginLeft: 10,
    color: '#4E6BB8',
  },
  dropdown: {
    width: '100%',
    borderColor: 'gray',
    // margin: 10,
  },
  dropDownContainer: {
    width: '90%',
    // margin: 10,
  },
  invalid: {
    borderColor: 'red',
    borderBottomWidth: 1,
  },
});
