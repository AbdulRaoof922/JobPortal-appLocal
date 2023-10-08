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

const SignUpEducationDetailsFresher = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const signUpdata = useSelector(state => state.common.signUpFresher);
  const userType = useSelector(state => state.auth.signUpRole);
  const [highestEducation, setHighestEducation] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const [passingOutYear, setPassingOutYear] = useState(new Date());
  const [passingYear, setPassingYear] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gradingSystem, setGradingSystem] = useState(null);
  const [instituteName, setInstituteName] = useState('');
  const [isEducationOpen, setEducationOpen] = useState(false);
  const [isCourseTypeOpen, setCourseTypeOpen] = useState(false);
  const [isGradingSystemOpen, setGradingSystemOpen] = useState(false);
  const [marks, setMarks] = useState('');
  const [loading, setLoading] = useState(false);
  const educationItems = [
    {label: 'High School', value: 'high_school'},
    {label: 'Undergraduate', value: 'undergraduate'},
    {label: 'Postgraduate', value: 'postgraduate'},
  ];

  const courseTypeItems = [
    {label: 'Full Time', value: 'full_time'},
    {label: 'Part Time', value: 'part_time'},
    {label: 'Distance', value: 'distance'},
  ];

  const gradingSystemItems = [
    {label: 'CGPA', value: 'cgpa'},
    {label: 'Percentage', value: 'percentage'},
    {label: 'Other', value: 'other'},
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPassingOutYear(selectedDate);
      // Format and store the date string without using moment
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are zero-indexed in JS
      const year = selectedDate.getFullYear();
      setPassingYear(`${year}-${month}-${day}`);
    }
  };
  const onEducationOpen = useCallback(() => {
    setEducationOpen(true);
    setCourseTypeOpen(false);
    setGradingSystemOpen(false);
  }, []);

  const onCourseOpen = useCallback(() => {
    setEducationOpen(false);
    setCourseTypeOpen(true);
    setGradingSystemOpen(false);
  }, []);

  const onGradingOpen = useCallback(() => {
    setEducationOpen(false);
    setCourseTypeOpen(false);
    setGradingSystemOpen(true);
  }, []);
  const validateFields = () => {
    let isValid = true;

    if (!highestEducation) {
      isValid = false;
    }

    if (!courseType) {
      isValid = false;
    }

    if (!passingOutYear) {
      isValid = false;
    }

    if (!gradingSystem) {
      isValid = false;
    }

    if (!marks) {
      isValid = false;
    }

    if (!instituteName) {
      isValid = false;
    }

    if (!isValid) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }

    return isValid;
  };
  useEffect(() => {
    setHighestEducation(user?.user?.highestEducation);
    setCourseType(user?.user?.courseType);
    setPassingYear(user?.user?.passingOutYear);
    setGradingSystem(user?.user?.gradingSystem);
    setMarks(user?.user?.marks);
    setInstituteName(user?.user?.currentAddress);

    if (user) {
    }
  }, []);
  const handleContinue = () => {
    if (validateFields()) {
      if (user) {
        onPressUpdate();
      } else {
        const educationDetails = {
          highestEducation,
          courseType,
          passingYear,
          gradingSystem,
          instituteName,
          marks,
        };

        // Dispatch the object using an action creator
        dispatch(setSignUpFresher({...signUpdata, ...educationDetails}));

        if (userType === 'Professional') {
          navigation.navigate('SignUpEmployment');
        } else {
          navigation.navigate('Personal');
        }
      }
      // Create an object from the state
    }
  };
  const onPressUpdate = async () => {
    setLoading(true);
    const updateObjectFields = {
      highestEducation: highestEducation,
      courseType: courseType,
      passingOutYear: passingYear,
      gradingSystem: gradingSystem,
      marks: marks,
      institute: instituteName,
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
          title="Education"
          description="please provide required information to log in."
        />
        <View
          style={{
            margin: 10,
            width: '90%',
            marginHorizontal: '5%',
            // backgroundColor: 'red',
            zIndex: 1000,
          }}>
          <DropDownPicker
            open={isEducationOpen}
            setOpen={onEducationOpen}
            onClose={() => setEducationOpen(false)}
            value={highestEducation}
            items={educationItems}
            placeholder="Highest Education"
            style={styles.dropdown}
            onSelectItem={item => setHighestEducation(item.value)}
            dropDownContainerStyle={{borderColor: 'gray'}} // Opened dropdown border color
            containerStyle={{borderColor: 'gray'}} // Closed dropdown border color
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <View
          style={{
            margin: 10,
            width: '90%',
            marginHorizontal: '5%',
            // backgroundColor: 'red',
            zIndex: 500,
          }}>
          <DropDownPicker
            open={isCourseTypeOpen}
            setOpen={onCourseOpen}
            onClose={() => setCourseTypeOpen(false)}
            value={courseType}
            items={courseTypeItems}
            placeholder="Course Type"
            style={styles.dropdown}
            onSelectItem={item => setCourseType(item.value)}
            dropDownContainerStyle={{borderColor: 'gray'}} // Opened dropdown border color
            containerStyle={{borderColor: 'gray'}} // Closed dropdown border color
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput
            label="Passing Out Year"
            value={passingYear}
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
              value={passingOutYear}
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
            open={isGradingSystemOpen}
            setOpen={onGradingOpen}
            onClose={() => setGradingSystemOpen(false)}
            value={gradingSystem}
            items={gradingSystemItems}
            placeholder="Grading System"
            style={styles.dropdown}
            onSelectItem={item => setGradingSystem(item.value)}
            dropDownContainerStyle={{borderColor: 'gray'}} // Opened dropdown border color
            containerStyle={{borderColor: 'gray'}} // Closed dropdown border color
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
        <TextInput
          label="Total Marks"
          value={marks}
          mode="outlined"
          keyboardType="number-pad"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setMarks(text)}
        />
        <TextInput
          label="Institute Name"
          value={instituteName}
          mode="outlined"
          style={[styles.input, {width: '90%', marginTop: 10}]}
          onChangeText={text => setInstituteName(text)}
        />

        <MyButton
          title={user ? 'update' : 'Continue'}
          onPress={handleContinue}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpEducationDetailsFresher;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    // margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 10,
  },
  dropdown: {
    width: '100%',
    borderColor: 'gray',
  },
  dropDownContainer: {
    width: '90%',
    borderColor: 'gray',
  },
  inputWithIcon: {
    width: '90%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#4E6BB8',
    borderRadius: 10,
  },
});
