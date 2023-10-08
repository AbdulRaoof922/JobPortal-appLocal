import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import MyButton from '../component/MyButton';
import DescriptionBlock from '../component/DescriptionBlock';
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpFresher} from '../redux/Reducers/CommonReducer';
import LoadingModal from '../component/LoadingModal';
import axios from 'axios';
import {setUser} from '../redux/Reducers/AuthReducer';

const SignUpEmployment = ({navigation}) => {
  const dispatch = useDispatch();
  const signUpdata = useSelector(state => state.common.signUpFresher);
  const user = useSelector(state => state.auth.user);

  const [organizationName, setOrganizationName] = useState('');
  const [designation, setDesignation] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [workingFrom, setWorkingFrom] = useState(new Date());
  const [workingFromString, setWorkingFromString] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [describeProfile, setDescribeProfile] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State variables for field validation
  const [isOrganizationNameValid, setIsOrganizationNameValid] = useState(true);
  const [isDesignationValid, setIsDesignationValid] = useState(true);
  const [isCurrentCompanyValid, setIsCurrentCompanyValid] = useState(true);
  const [isWorkingFromValid, setIsWorkingFromValid] = useState(true);
  const [isCurrentSalaryValid, setIsCurrentSalaryValid] = useState(true);
  const [isNoticePeriodValid, setIsNoticePeriodValid] = useState(true);
  const [isKeySkillsValid, setIsKeySkillsValid] = useState(true);
  const [isDescribeProfileValid, setIsDescribeProfileValid] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setOrganizationName(user?.user?.organizationName);
      setDesignation(user?.user?.designation);
      setCurrentCompany(user?.user?.currentCompany);
      setWorkingFromString(user?.user?.workingFrom);
      setCurrentSalary(user?.user?.currentSalary);
      setNoticePeriod(user?.user?.noticePeriod);
      setKeySkills(user?.user?.keySkills);
      setDescribeProfile(user?.user?.describeProfile);
    }
  }, []);
  const onPressUpdate = async () => {
    setLoading(true);
    const updateObjectFields = {
      organizationName,
      designation,
      workingFrom: workingFromString,
      currentSalary,
      noticePeriod,
      keySkills,
      describeProfile,
    };
    try {
      const response = await axios.patch(
        `https://ill-pear-basket-clam-tie.cyclic.cloud/update-proProfile/${user?.user?.id}`,
        {
          ...updateObjectFields,
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

  const emloymentDetails = {
    organizationName,
    designation,
    currentCompany,
    workingFrom,
    currentSalary,
    noticePeriod,
    keySkills,
    describeProfile,
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setWorkingFrom(selectedDate);
      // Format and store the date string without using moment
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are zero-indexed in JS
      const year = selectedDate.getFullYear();

      setWorkingFromString(`${day}/${month}/${year}`);
    }
  };

  const validateFields = () => {
    let isValid = true;
    setIsOrganizationNameValid(true);
    setIsDesignationValid(true);
    setIsCurrentCompanyValid(true);
    setIsWorkingFromValid(true);
    setIsCurrentSalaryValid(true);
    setIsNoticePeriodValid(true);
    setIsKeySkillsValid(true);
    setIsDescribeProfileValid(true);

    if (!organizationName) {
      setIsOrganizationNameValid(false);
      isValid = false;
    }

    if (!designation) {
      setIsDesignationValid(false);
      isValid = false;
    }

    if (!currentCompany) {
      setIsCurrentCompanyValid(false);
      isValid = false;
    }

    if (!currentSalary) {
      setIsCurrentSalaryValid(false);
      isValid = false;
    }

    if (!noticePeriod) {
      setIsNoticePeriodValid(false);
      isValid = false;
    }

    if (!keySkills) {
      setIsKeySkillsValid(false);
      isValid = false;
    }

    if (!describeProfile) {
      setIsDescribeProfileValid(false);
      isValid = false;
    }

    if (!isValid) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }

    return isValid;
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
          title="Employment"
          description="please provide required information to sign up."
        />
        <TextInput
          label="Organization Name"
          value={organizationName}
          mode="outlined"
          outlineStyle={[!isOrganizationNameValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsOrganizationNameValid(true);
            setOrganizationName(text);
          }}
        />
        <TextInput
          label="Designation"
          value={designation}
          mode="outlined"
          outlineStyle={[!isDesignationValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsDesignationValid(true);
            setDesignation(text);
          }}
        />
        <TextInput
          label="Current Company"
          value={currentCompany}
          mode="outlined"
          outlineStyle={[!isCurrentCompanyValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsCurrentCompanyValid(true);
            setCurrentCompany(text);
          }}
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            label="Working From"
            value={workingFromString}
            mode="outlined"
            outlineStyle={[!isWorkingFromValid && styles.invalid]}
            contentStyle={{
              alignSelf: 'flex-start',
              marginLeft: 15,
            }}
            style={[styles.input, {width: '100%'}, ,]}
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
              value={workingFrom}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <TextInput
          label="Current Salary"
          value={currentSalary}
          mode="outlined"
          outlineStyle={[!isCurrentSalaryValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsCurrentSalaryValid(true);
            setCurrentSalary(text);
          }}
        />
        <TextInput
          label="Notice Period"
          value={noticePeriod}
          mode="outlined"
          outlineStyle={[!isNoticePeriodValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsNoticePeriodValid(true);
            setNoticePeriod(text);
          }}
        />
        <TextInput
          label="Key Skills"
          value={keySkills}
          mode="outlined"
          outlineStyle={[!isKeySkillsValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsKeySkillsValid(true);
            setKeySkills(text);
          }}
        />
        <TextInput
          label="Describe Profile"
          value={describeProfile}
          mode="outlined"
          outlineStyle={[!isDescribeProfileValid && styles.invalid]}
          style={[styles.input]}
          onChangeText={text => {
            setIsDescribeProfileValid(true);
            setDescribeProfile(text);
          }}
        />

        <MyButton
          title={user ? 'update' : 'Continue'}
          onPress={() => {
            if (validateFields()) {
              if (user) {
                onPressUpdate();
              } else {
                const emloymentDetails = {
                  organizationName,
                  designation,
                  currentCompany,
                  workingFromString,
                  currentSalary,
                  noticePeriod,
                  keySkills,
                  describeProfile,
                };
                dispatch(
                  setSignUpFresher({...signUpdata, ...emloymentDetails}),
                );

                navigation.navigate('Personal');
              }
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpEmployment;

// Styles remain mostly unchanged
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 10,
    marginVertical: 5, // Added vertical margin for separation
  },
  inputWithIcon: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#4E6BB8',
    borderRadius: 10,
    marginVertical: 5, // Added vertical margin for separation
  },
  invalid: {
    borderColor: 'red',
    borderBottomWidth: 1,
  },
});
