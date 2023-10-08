import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import MyButton from '../component/MyButton';
import {Text, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import DescriptionBlock from '../component/DescriptionBlock';
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpFresher} from '../redux/Reducers/CommonReducer';
import axios from 'axios';
import {setUser} from '../redux/Reducers/AuthReducer';

const Others = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const userType = useSelector(state => state.auth.signUpRole);
  const signUpdata = useSelector(state => state.common.signUpFresher);

  const [isResumeHeadlineOpen, setResumeHeadlineOpen] = useState(false);
  const [ResumeHeadline, setResumeHeadline] = useState(null);
  const [certification, setCertification] = useState('');
  const [Summary, setSummary] = useState('');
  const [loader, setLoader] = useState(false);

  const ResumeHeadlineItems = [
    {label: 'HR Specialist', value: 'HR Specialist'},
    {label: 'Supply Chain Manager', value: 'Supply Chain Manager'},
    {
      label: 'Engineer in machine learning and data mining',
      value: 'Engineer in machine learning and data mining',
    },
    {label: 'Ecommerce Senior Developer', value: 'Ecommerce Senior Developer'},
    {
      label: 'Pharmastic in pharmacy industry',
      value: 'Pharmastic in pharmacy industry',
    },
    {
      label:
        'Cashier Providing efficient and accurate service in the Food industry',
      value:
        'Cashier Providing efficient and accurate service in the Food industry',
    },
    {
      label: 'Graphic Designer',
      value: 'Graphics Designer',
    },
  ];

  const validateFields = () => {
    let isValid = true;

    if (!ResumeHeadline) {
      isValid = false;
    }

    if (!certification.trim()) {
      isValid = false;
    }

    if (!Summary.trim()) {
      isValid = false;
    }

    if (!isValid) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }

    return isValid;
  };
  const handleFileChange = async signupData => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: signupData?.document[0].uri,
        type: 'application/pdf', // or whatever the actual type is
        name: 'resume.pdf', // or whatever the actual name is
      });
      formData.append('upload_preset', 'resumes');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfewwtzi3/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      console.error('Error details:', error.message, error.config);
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const imageUrl = await handleFileChange(signUpdata);

      const response = await axios.post(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/freshers',
        {
          name: signUpdata.fullName,
          email: signUpdata.emailId,
          contactNumber: signUpdata.mobileNumber,
          password: signUpdata.password,
          resume: imageUrl ? imageUrl : 'www.resume.com', // Replace with actual resume link or data
          gender: signUpdata.gender,
          highestEducation: signUpdata.highestEducation,
          courseType: signUpdata.courseType,
          passingOutYear: signUpdata.passingYear, // Convert to "YYYY-MM-DD" format
          gradingSystem: signUpdata.gradingSystem,
          marks: signUpdata.marks,
          institute: signUpdata.instituteName,
          dob: signUpdata.dob, // Convert to "YYYY-MM-DD" format
          maritalStatus: signUpdata.maritalStatus,
          language: signUpdata.Language,
          currentAddress: signUpdata.adress,
          permanentAddress: signUpdata.permanantAdress,
          certification: certification,
          resumeHeadline: ResumeHeadline,
          summary: Summary,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(
        setUser({user: signUpdata, userType: 'Fresher', ...response.data}),
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      setLoader(false);
    } catch (error) {
      if (error.response) {
        setLoader(false);
        alert('Response data please try again:', error.response.data);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  const handleSubmitProfessional = async () => {
    setLoader(true);
    const imageUrl = await handleFileChange(signUpdata);
    try {
      const response = await axios.post(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/professionals',
        {
          name: signUpdata.fullName,
          email: signUpdata.emailId,
          mobile: signUpdata.mobileNumber,
          password: signUpdata.password,
          gender: signUpdata.gender,
          highestEducation: signUpdata.highestEducation,
          courseType: signUpdata.courseType,
          passingOutYear: signUpdata.passingYear,
          gradingSystem: signUpdata.gradingSystem,
          marks: signUpdata.marks,
          institute: signUpdata.instituteName,
          dob: signUpdata.dob,
          maritalStatus: signUpdata.maritalStatus,
          language: signUpdata.Language,
          currentAddress: signUpdata.adress,
          permanentAddress: signUpdata.permanantAdress,
          certification: certification,
          resumeHeadline: ResumeHeadline,
          summary: Summary,
          currentCompany: signUpdata.currentCompany,
          currentSalary: signUpdata.currentSalary,
          noticePeriod: signUpdata.noticePeriod,
          keySkills: signUpdata.keySkills,
          describeProfile: signUpdata.describeProfile,
          designation: signUpdata.designation,
          organizationName: signUpdata.organizationName,
          workingFrom: signUpdata.workingFromString,
          // Fields from the Postman example
          resume: imageUrl, // Adjust this
          desiredIndustry: signUpdata.industry,
          desiredDepartment: signUpdata.department,
          desiredRole: signUpdata.role,
          desiredEmployment: signUpdata.employmentType,
          desiredJobType: signUpdata.jobType,
          expectedCTC: signUpdata.expectedETC,
          preferredShift: signUpdata.preferredShift,
          desiredCity: signUpdata.desiredCity,
          appliedDate: '2023-10-29',
          // Add any additional fields here
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const newObject = {
        ...signUpdata,
        ...response.data,
      };
      // return;
      dispatch(setUser({...newObject, userType: 'Professional'}));
      // If you have a navigation object, navigate to the Main component
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.error('Error inserting data:', error);
      if (error.response) {
        alert('Response data Please try again:', error.response.data);

        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      // Handle error as needed
    }
  };

  useEffect(() => {
    if (user) {
      setResumeHeadline(user?.user?.resumeHeadline);
      setCertification(user?.user?.certification);
      setSummary(user?.user?.summary);
    }
  }, []);
  const onPressUpdate = async () => {
    setLoader(true);
    const updateObjectFields = {
      resumeHeadline: ResumeHeadline,
      certification,
      summary: Summary,
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
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={styles.container}>
        <DescriptionBlock
          title="Others"
          description="please provide required information to sign up."
        />
        <View
          style={{
            margin: 10,
            width: '90%',
            marginHorizontal: '5%',
            zIndex: 300,
          }}>
          <DropDownPicker
            open={isResumeHeadlineOpen}
            setOpen={setResumeHeadlineOpen}
            value={ResumeHeadline}
            items={ResumeHeadlineItems}
            placeholder="Resume Headline"
            style={styles.dropdown}
            onSelectItem={item => setResumeHeadline(item.value)}
            dropDownContainerStyle={{borderColor: 'gray'}}
            containerStyle={{borderColor: 'gray'}}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
        <TextInput
          label="My Certification"
          value={certification}
          mode="outlined"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setCertification(text)}
        />

        <TextInput
          label="My Summary"
          value={Summary}
          mode="outlined"
          style={[styles.input, {width: '90%'}]}
          onChangeText={text => setSummary(text)}
        />

        <MyButton
          isLoading={loader}
          title={user ? 'update' : 'Submit'}
          onPress={() => {
            if (validateFields()) {
              if (user) {
                onPressUpdate();
              } else {
                // Dispatching data before navigating
                const personalDetails = {
                  ResumeHeadline,
                  certification,
                  Summary,
                  // Add other fields as needed
                };
                dispatch(setSignUpFresher({...signUpdata, ...personalDetails}));

                if (userType == 'Professional') {
                  //professsional api call
                  setTimeout(() => {
                    handleSubmitProfessional();
                  }, 1000);
                  // handleFileChange(signUpdata);
                } else {
                  //call fresher api call
                  setTimeout(() => {
                    handleSubmit();
                    // handleFileChange(signUpdata);
                  }, 1000);
                }
              }

              // navigation.navigate('NextScreen'); // replace 'NextScreen' with the actual screen name you want to navigate to.
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Others;

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
});
