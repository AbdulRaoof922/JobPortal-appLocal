import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  ToastAndroid,
} from 'react-native';
import MyButton from '../component/MyButton';
import {TextInput, DatePicker, Button} from 'react-native-paper'; // Assuming DatePicker exists in 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import DescriptionBlock from '../component/DescriptionBlock';
import {setSignUpFresher} from '../redux/Reducers/CommonReducer';
import LoadingModal from '../component/LoadingModal';
import axios from 'axios';
import {setUser} from '../redux/Reducers/AuthReducer';
const PersonalDetailFresher = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const signUpdata = useSelector(state => state.common.signUpFresher);

  const userType = useSelector(state => state.auth.signUpRole);
  const [DateOfBirth, setDateOfBirth] = useState(new Date());
  const [dob, setDob] = useState('');
  const [isMaritalStatusOpen, setMaritalStatusOpen] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [martialStatus, setMartialStatus] = useState(null);
  const [Language, setLanguage] = useState('');
  const [adress, setAdress] = useState('');
  const [permanantAdress, setPermanantAdress] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [maritalStatusError, setMaritalStatusError] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [adressError, setAdressError] = useState('');
  const [permanantAdressError, setPermanantAdressError] = useState('');
  const [isGradingSystemOpen, setGradingSystemOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const maritalStatusItems = [
    {label: 'Single', value: 'single'},
    {label: 'Married', value: 'married'},
    {label: 'Divorced', value: 'divorced'},
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate); // Store the selected Date object

      // Format and store the date string without using moment
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are zero-indexed in JS
      const year = selectedDate.getFullYear();

      setDob(`${year}-${month}-${day}`);
    }
  };
  const validate = useCallback(() => {
    let isValid = true;

    if (!DateOfBirth) {
      setDateOfBirthError('Date of Birth is required');
      isValid = false;
    } else {
      setDateOfBirthError('');
    }

    if (!maritalStatus) {
      setMaritalStatusError('Marital Status is required');
      isValid = false;
    } else {
      setMaritalStatusError('');
    }

    if (!Language.trim()) {
      setLanguageError('Language is required');
      isValid = false;
    } else {
      setLanguageError('');
    }

    if (!adress.trim()) {
      setAdressError('Current Address is required');
      isValid = false;
    } else {
      setAdressError('');
    }

    if (!permanantAdress.trim()) {
      setPermanantAdressError('Permanent Address is required');
      isValid = false;
    } else {
      setPermanantAdressError('');
    }

    return isValid;
  }, [DateOfBirth, maritalStatus, Language, adress, permanantAdress]);
  useEffect(() => {
    if (user) {
      setDob(user?.user?.dob.split('T')[0]);
      setMaritalStatus(user?.user?.maritalStatus);
      setLanguage(user?.user?.language);
      setAdress(user?.user?.currentAddress);
      setPermanantAdress(user?.user?.permanentAddress);
    }
  }, []);
  const onPressUpdate = async () => {
    setLoading(true);
    const updateObjectFields = {
      dob: dob,
      maritalStatus: maritalStatus,
      language: Language,
      currentAddress: adress,
      permanentAddress: permanantAdress,
    };
    try {
      const response = await axios.patch(
        `https://ill-pear-basket-clam-tie.cyclic.cloud/update-${
          user.userType == 'Fresher' ? 'profile' : 'proProfile'
        }/${user?.user?.id}`,
        {
          // name: 'ali',
          dob: dob,
          maritalStatus: maritalStatus,
          language: Language,
          currentAddress: adress,
          permanentAddress: permanantAdress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const updatedUser = {
        ...user.user,
        ...updateObjectFields,
        // any other fields you want to update
      };
      const updateMainObject = {
        ...user,
        user: updatedUser,
      };
      dispatch(setUser(updateMainObject));
      // Handle response accordingly
      navigation.goBack();

      // You might want to navigate the user to another screen or update the UI in some way here
    } catch (err) {
      // setError(err.message || 'An error occurred while updating profile');
    } finally {
      setLoading(false);
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
          title="Personal Details"
          description="please provide required information to sign up."
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            label="Date Of Birth"
            value={dob}
            mode="outlined"
            contentStyle={{
              alignSelf: 'flex-start',
              marginLeft: 15,
              //   backgroundColor: 'red',
            }}
            style={styles.input}
            editable={false}
            right={
              <TextInput.Icon
                icon={'calendar'}
                color={'black'}
                name="calendar"
                onPress={() => setShowDatePicker(true)}
              />
            }
          />
          {showDatePicker && (
            <DateTimePicker
              value={DateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View
          style={{
            margin: 10,
            width: '90%',
            marginHorizontal: '5%',
            // backgroundColor: 'red',
            zIndex: 300,
          }}>
          <DropDownPicker
            open={isMaritalStatusOpen}
            setOpen={setMaritalStatusOpen}
            value={maritalStatus}
            items={maritalStatusItems}
            placeholder="Marital Status"
            style={styles.dropdown}
            onSelectItem={item => setMaritalStatus(item.value)}
            dropDownContainerStyle={{borderColor: 'gray'}}
            containerStyle={{borderColor: 'gray'}}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
        <TextInput
          label="Language"
          value={Language}
          mode="outlined"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setLanguage(text)}
        />
        <TextInput
          label="Current Adress"
          value={adress}
          mode="outlined"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setAdress(text)}
        />
        <TextInput
          label="Permanant Adress"
          value={permanantAdress}
          mode="outlined"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setPermanantAdress(text)}
        />

        <MyButton
          title={user ? 'update' : 'Continue'}
          onPress={() => {
            if (validate()) {
              if (user) {
                onPressUpdate();
              } else {
                const personalDetails = {
                  dob,
                  maritalStatus,
                  Language,
                  adress,
                  permanantAdress,
                };
                dispatch(setSignUpFresher({...signUpdata, ...personalDetails}));
                if (userType == 'Professional') {
                  navigation.navigate('SignUpDesiredCarrerProfile');
                } else {
                  navigation.navigate('Others');
                }
              }
            } else {
              ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetailFresher;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '90%',
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 10,
    marginVertical: 10,
  },
  dropdown: {
    width: '100%',
    borderColor: 'gray',
  },
  dropdownContainer: {
    width: '90%',
    borderColor: 'gray',
    marginVertical: 10,
  },
  inputWithIcon: {
    ...StyleSheet.flatten([
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    ]), // Flatten merges styles from input and adds flexDirection and justifyContent properties
  },
});
