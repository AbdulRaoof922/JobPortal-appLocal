import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import MyButton from '../component/MyButton';
import DescriptionBlock from '../component/DescriptionBlock';
import {setSignUpFresher} from '../redux/Reducers/CommonReducer';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/Reducers/AuthReducer';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const SignUpDesiredCareerProfile = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const signUpdata = useSelector(state => state.common.signUpFresher);

  const [industry, setIndustry] = useState(null);
  const [department, setDepartment] = useState(null);
  const [role, setRole] = useState('');
  const [employmentType, setEmploymentType] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [expectedETC, setExpectedETC] = useState('');
  const [preferredShift, setPreferredShift] = useState(null);
  const [desiredCity, setDesiredCity] = useState('');
  const [isDepartmentOpen, setDepartmentOpen] = useState(false);
  const [isEmploymentTypeOpen, setEmploymentTypeOpen] = useState(false);
  const [isJobTypeOpen, setJobTypeOpen] = useState(false);
  const [isPreferredShiftOpen, setPreferredShiftOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // Sample dropdown items (Add or modify these accordingly)
  useEffect(() => {
    if (user) {
      setIndustry(user?.user?.desiredIndustry);
      setDepartment(user?.user?.desiredDepartment);
      setRole(user?.user?.desiredRole);
      setEmploymentType(user?.user?.desiredEmployment);
      setJobType(user?.user?.desiredJobType);
      setExpectedETC(user?.user?.expectedCTC);
      setPreferredShift(user?.user?.preferredShift);
      setDesiredCity(user?.user?.desiredCity);
    }
  }, []);
  const onPressUpdate = async () => {
    setLoader(true);
    const updateObjectFields = {
      desiredIndustry: industry,
      desiredDepartment: department,
      desiredRole: role,
      desiredEmployment: employmentType,
      desiredJobType: jobType,
      expectedCTC: expectedETC,
      preferredShift: preferredShift,
      desiredCity: desiredCity,
    };
    try {
      const response = await axios.patch(
        `https://ill-pear-basket-clam-tie.cyclic.cloud/update-${
          user.userType == 'Fresher' ? 'profile' : 'proProfile'
        }/${user?.user?.id}`,
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
      setLoader(false);
    }
  };

  const departmentItems = [
    {label: 'Sales', value: 'sales'},
    {label: 'HR', value: 'hr'},
    // ... Add more
  ];

  const employmentTypeItems = [
    {label: 'Full-Time', value: 'full_time'},
    {label: 'Part-Time', value: 'part_time'},
    // ... Add more
  ];

  const jobTypeItems = [
    {label: 'Remote', value: 'remote'},
    {label: 'On-Site', value: 'on_site'},
    // ... Add more
  ];

  const preferredShiftItems = [
    {label: 'Day', value: 'day'},
    {label: 'Night', value: 'night'},
    // ... Add more
  ];
  const onDepartmentOpen = useCallback(() => {
    setDepartmentOpen(true);
    setEmploymentTypeOpen(false);
    setJobTypeOpen(false);
    setPreferredShiftOpen(false);
  }, []);

  const onEmploymentTypeOpen = useCallback(() => {
    setDepartmentOpen(false);
    setEmploymentTypeOpen(true);
    setJobTypeOpen(false);
    setPreferredShiftOpen(false);
  }, []);

  const onJobTypeOpen = useCallback(() => {
    setDepartmentOpen(false);
    setEmploymentTypeOpen(false);
    setJobTypeOpen(true);
    setPreferredShiftOpen(false);
  }, []);

  const onPreferredShiftOpen = useCallback(() => {
    setDepartmentOpen(false);
    setEmploymentTypeOpen(false);
    setJobTypeOpen(false);
    setPreferredShiftOpen(true);
  }, []);
  const validateFields = () => {
    let isValid = true;

    if (!industry) {
      isValid = false;
    }

    if (!department) {
      isValid = false;
    }

    if (!role) {
      isValid = false;
    }

    if (!employmentType) {
      isValid = false;
    }

    if (!jobType) {
      isValid = false;
    }

    if (!expectedETC) {
      isValid = false;
    }

    if (!preferredShift) {
      isValid = false;
    }

    if (!desiredCity) {
      isValid = false;
    }

    if (!isValid) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }

    return isValid;
  };
  const handleContinue = () => {
    if (validateFields()) {
      if (user) {
        onPressUpdate();
      } else {
        const carrerDetails = {
          industry,
          department,
          role,
          employmentType,
          jobType,
          expectedETC,
          preferredShift,
          desiredCity,
        };
        dispatch(setSignUpFresher({...signUpdata, ...carrerDetails}));

        // Navigate to the next screen or perform other actions
        navigation.navigate('Others');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <LoadingModal isVisible={loader} />
      <ScrollView contentContainerStyle={styles.container}>
        <DescriptionBlock
          title="Desired Carrer Profile"
          description="please provide required information to sign up."
        />
        <TextInput
          label="Industry"
          value={industry}
          mode="outlined"
          style={styles.input}
          onChangeText={text => setIndustry(text)}
        />
        <View
          style={[styles.dropdownContainer, {zIndex: 1000, marginBottom: 0}]}>
          <DropDownPicker
            open={isDepartmentOpen}
            setOpen={onDepartmentOpen}
            onClose={() => setDepartmentOpen(false)}
            value={department}
            items={departmentItems}
            placeholder="Department"
            style={styles.dropdown}
            zIndex={4000}
            zIndexInverse={1000}
            onSelectItem={item => setDepartment(item.value)}
          />
        </View>
        <TextInput
          label="Role"
          value={role}
          mode="outlined"
          style={styles.input}
          onChangeText={text => setRole(text)}
        />
        <View style={[styles.dropdownContainer, {zIndex: 800}]}>
          <DropDownPicker
            open={isEmploymentTypeOpen}
            setOpen={onEmploymentTypeOpen}
            onClose={() => setEmploymentTypeOpen(false)}
            value={employmentType}
            items={employmentTypeItems}
            placeholder="Employment Type"
            style={styles.dropdown}
            zIndex={3000}
            zIndexInverse={2000}
            onSelectItem={item => setEmploymentType(item.value)}
          />
        </View>
        <View
          style={[styles.dropdownContainer, {zIndex: 600, marginBottom: 0}]}>
          <DropDownPicker
            open={isJobTypeOpen}
            setOpen={onJobTypeOpen}
            onClose={() => setJobTypeOpen(false)}
            value={jobType}
            items={jobTypeItems}
            placeholder="Job Type"
            style={styles.dropdown}
            zIndex={2000}
            zIndexInverse={3000}
            onSelectItem={item => setJobType(item.value)}
          />
        </View>
        <TextInput
          label="Expected ETC"
          value={expectedETC}
          mode="outlined"
          style={styles.input}
          onChangeText={text => setExpectedETC(text)}
        />
        <View
          style={[styles.dropdownContainer, {zIndex: 400, marginBottom: 0}]}>
          <DropDownPicker
            open={isPreferredShiftOpen}
            setOpen={onPreferredShiftOpen}
            onClose={() => setPreferredShiftOpen(false)}
            value={preferredShift}
            items={preferredShiftItems}
            placeholder="Preferred Shift"
            style={styles.dropdown}
            zIndex={1000}
            zIndexInverse={4000}
            onSelectItem={item => setPreferredShift(item.value)}
          />
        </View>
        <TextInput
          label="Desired City"
          value={desiredCity}
          mode="outlined"
          style={styles.input}
          onChangeText={text => setDesiredCity(text)}
        />
        {/* You can add a button like "Continue" similar to the example provided */}
        <MyButton
          title={user ? 'update' : 'Continue'}
          onPress={handleContinue}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpDesiredCareerProfile;

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
    marginTop: 10,
  },
  dropdown: {
    width: '100%',
    borderColor: 'gray',
  },
  dropdownContainer: {
    width: '90%',
    margin: 10,
    borderColor: 'gray',
  },
});
