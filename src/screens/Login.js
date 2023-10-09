import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MyButton from '../component/MyButton';
import {TextInput, Text} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/FontAwesome6';
import Snackbar from 'react-native-snackbar';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/Reducers/AuthReducer';
import RadioButton from '../component/RadioButton';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [invalidemail, setinvalidemail] = useState(false);
  const [invalidpassword, setinvalidpassword] = useState(false);
  const [visible, setvisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isFresher, setIsFresher] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleLoginProfessional = async () => {
    setLoader(true);
    try {
      if (!email || !password) {
        Snackbar.show({
          text: 'Required field is missing',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        const response = await fetch(
          'https://ill-pear-basket-clam-tie.cyclic.cloud/professional-login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          },
        );
        const data = await response.json();
        if (response.status === 200) {
          setLoader(false);
          dispatch(setUser({...data, userType: 'Professional'}));
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
          const {token, message} = data;
        } else {
          setLoader(false);
          alert('Login failed:', data.error);

          console.error('Login failed:', data.error);
        }
      }
    } catch (error) {
      setLoader(false);
      alert('Error:', error);

      console.error('Error:', error);
    }
  };
  const handleLoginFresher = async () => {
    try {
      if (!email || !password) {
        Snackbar.show({
          text: 'Required field is missing',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        setLoader(true);
        const response = await fetch(
          'https://ill-pear-basket-clam-tie.cyclic.cloud/fresher-login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          },
        );
        const data = await response.json();
        if (response.status === 200) {
          setLoader(false);
          dispatch(setUser({...data, userType: 'Fresher'}));
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
          const {token, message} = data;
        } else {
          setLoader(false);
          console.error('Login failed:', data.error);
          alert('Login failed:', data.error);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error('Error:', error);
      alert('Error:', error);
    }
  };
  const validatePassword = val => {
    setpassword(val);
    if (val.length < 6) {
      setinvalidpassword(true);
    }
  };
  const validateEmail = text => {
    setemail(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text.trim()) === false) {
      setinvalidemail(true);
    }
  };
  return (
    // <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled
    //   keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Text style={[styles.login, {color: '#ffffff', fontSize: 16}]}>
          LOGO
        </Text>
      </View>
      <Text style={styles.login}>Log in</Text>
      <Text style={styles.signin}>Sign in to continue!</Text>

      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 5}}
        placeholder="Johndoe@email.com"
        onChangeText={text => setemail(text)}
        onFocus={() => setinvalidemail(false)}
        onEndEditing={e => validateEmail(e.nativeEvent.text)}
      />
      {invalidemail && (
        <Animatable.Text animation={'fadeInLeft'} style={styles.error}>
          please enter a valid email
        </Animatable.Text>
      )}
      <TextInput
        label="Password"
        value={password}
        style={styles.input}
        theme={{colors: {primary: '#3F6EEC3D'}, roundness: 5}}
        secureTextEntry={visible}
        mode="outlined"
        onFocus={() => setinvalidpassword(false)}
        onChangeText={text => setpassword(text)}
        onEndEditing={e => validatePassword(e.nativeEvent.text)}
        right={
          <TextInput.Icon
            color={'#777777'}
            icon={() => (
              <Feather
                name={'eye-slash'}
                size={20}
                color="#777777"
                onPress={() => setvisible(!visible)}
              />
            )}
          />
        }
      />
      {/* {invalidpassword && (
        <Animatable.Text animation={'fadeInLeft'} style={styles.error}>
          password must be 6 characters long
        </Animatable.Text>
      )} */}
      <View style={styles.checkBoxContainer}>
        <RadioButton
          label="Login me as Fresher?"
          isSelected={isFresher}
          onPress={() => {
            setIsFresher(true);
            setIsProfessional(false);
          }}
        />
        <RadioButton
          label="Login me as Professional?"
          isSelected={isProfessional}
          onPress={() => {
            setIsFresher(false);
            setIsProfessional(true);
          }}
        />
      </View>

      <View style={styles.rememberSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            disabled={false}
            value={checked}
            boxType="circle"
            tintColors={{true: '#3F6EEC', false: '#256CFC54'}}
            onValueChange={newValue => setChecked(newValue)}
          />
          <Text style={styles.remember}>Remember me!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.forget}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <MyButton
        isLoading={loader}
        title={'Login'}
        onPress={() => {
          if (!isFresher && !isProfessional) {
            ToastAndroid.show('Please select the role', ToastAndroid.SHORT);
            return;
          }
          if (isFresher) {
            handleLoginFresher();
          } else if (isProfessional) {
            handleLoginProfessional();
          }
        }}
      />

      <View style={styles.row2}>
        <View style={styles.line}></View>
        <View style={styles.rec}>
          <Text style={styles.remember}>or</Text>
        </View>
        <View style={styles.line}></View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.google}>
          <Image style={styles.img} source={require('../assets/google.png')} />
          <Text style={[styles.forget, {marginLeft: 10}]}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fb}>
          <Image style={styles.img} source={require('../assets/fb.png')} />
          <Text style={[styles.forget, {marginLeft: 5}]}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SelectRole')}>
        <Text style={styles.remember}>
          Don’t have an acount?
          <Text style={[styles.remember, {color: '#3F6EEC'}]}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#3F6EEC',
    width: '22%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 3,
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  input: {
    width: '90%',
    marginTop: 20,
    marginBottom: 0,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#ffffff',
    height: 55,
  },
  login: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'ReadexPro-Regular',
  },
  error: {
    fontSize: 14,
    color: 'red',
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    fontFamily: 'ReadexPro-Regular',
  },
  signin: {
    color: '#000000',
    fontSize: 14,
    margin: 5,
    fontFamily: 'ReadexPro-Regular',
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
  google: {
    width: '47%',
    padding: 10,
    backgroundColor: '#EA433514',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  fb: {
    width: '47%',
    padding: 10,
    backgroundColor: '#F1F4FD',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#9F9999',
    width: '40%',
    height: 2,
    margin: 5,
  },
  rec: {
    width: '10%',
    alignItems: 'center',
    borderColor: '#256CFC54',
    borderWidth: 1,
    borderRadius: 8,
  },
  rememberSection: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  checkBoxContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 10,
    marginTop: 10,
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxText: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'MartelSans-Regular',
  },
});
