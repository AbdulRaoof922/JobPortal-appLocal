import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import MyButton from '../component/MyButton';
import { TextInput, Text, Chip } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
const Registration = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('')
  const [location, setlocation] = useState('')
  const [company, setcompany] = useState('')
  const [role, setrole] = useState('')
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [name, setname] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);

  const [items, setItems] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' }
  ]);
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          backgroundColor: '#0000003D',
          width: '90%',
          borderColor: '#0000003D',
          borderWidth: 2,
          padding: 20,
          borderRadius: 20,
        }}>
        <Text style={styles.login}>Have you recently been laid off?</Text>
        <Text style={[styles.upload, { marginLeft: 0 }]}>
          Register as an immediate joiner
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.type}>
            . Get promoted to 10K+ recruters Pan india
          </Text>
          <Text style={styles.type}>. In-person assistance for job search</Text>
          <Text style={styles.type}>. Exclusive benefits for you,FREE</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.document}>
        <Text style={[styles.upload, { color: '#777777', marginLeft: 0 }]}>
          Autofill by resume
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.img} source={require('../assets/upload.png')} />
          <Text style={[styles.upload, { marginLeft: 5 }]}>Upload</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.type}>
        File spported pdf,doc,docx,rtf,txt- Max 5MB
      </Text>
      <TextInput
        label="Name"
        value={name}
        mode="outlined"
        style={styles.input}
        multiline={true}
        theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
        placeholder="Vijay Sharma"
        onChangeText={text => setname(text)}
      />
      <TextInput
        label="Mobile Number"
        value={phone}
        mode="outlined"
        style={styles.input}
        keyboardType='number-pad'
        multiline={true}
        theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
        placeholder="+91 657888 77"
        onChangeText={text => setphone(text)}
      />
      <TextInput
        label="Email Address"
        value={email}
        mode="outlined"
        style={styles.input}
        multiline={true}
        theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
        placeholder="Vijay.sharma78@gmail.com"
        onChangeText={text => setemail(text)}
      />
      <Text style={[styles.type, { alignSelf: 'flex-start', marginLeft: 25 }]}>
        *Password link will be sent to this email.
      </Text>
      <TextInput
        label="Location"
        value={location}
        mode="outlined"
        style={styles.input}
        multiline={true}
        theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
        placeholder="Mumbai, India"
        onChangeText={text => setlocation(text)}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        placeholder='Experience'
        placeholderStyle={styles.dinput}
        labelStyle={styles.dinput}
        style={{ width: '90%', marginHorizontal: 20, height: 55, margin: 10 }}
        dropDownContainerStyle={{ width: '90%', marginHorizontal: 20 }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TextInput
        label="Company"
        value={company}
        multiline={true}
        style={styles.input}
        theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
        mode="outlined"
        onChangeText={text => setcompany(text)}
      />
      <View style={{ width: '90%' }}>
        <View
          style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
          <CheckBox
            disabled={false}
            value={checked}
            boxType="circle"
            multiline={true}
            tintColors={{ true: '#3F6EEC', false: '#256CFC54' }}
            onValueChange={newValue => setChecked(newValue)}
          />
          <Text style={styles.remember}>Currently, i am not working</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {checked === false && (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <DropDownPicker
              open={open2}
              value={value2}
              items={items}
              placeholderStyle={styles.dinput}
              labelStyle={styles.dinput}
              placeholder='Notice Period'
              style={{ width: '90%', marginHorizontal: 20, height: 55, margin: 10 }}
              dropDownContainerStyle={{ width: '90%', marginHorizontal: 20 }}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems}
            />
            <TextInput
              label="Designation"
              value={role}
              style={styles.input}
              multiline={true}
              theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
              mode="outlined"
              onChangeText={text => setrole(text)}
            />
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                label="Start Date"
                value={'12-03-2023'}
                style={styles.inputsmall}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                mode="outlined"
              />
              <TextInput
                label="Last Working Day"
                value={'12-03-2023'}
                style={styles.inputsmall}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                mode="outlined"
              />
            </View>
            <DropDownPicker
              open={open3}
              value={value3}
              items={items}
              placeholder='Salary'
              placeholderStyle={styles.dinput}
              labelStyle={styles.dinput}
              style={{ width: '90%', marginHorizontal: 20, height: 55, margin: 10 }}
              dropDownContainerStyle={{ width: '90%', marginHorizontal: 20 }}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setItems}
            />
            <DropDownPicker
              open={open4}
              value={value4}
              items={items}
              placeholderStyle={styles.dinput}
              labelStyle={styles.dinput}
              placeholder='Highest Communication'
              style={{ width: '90%', marginHorizontal: 20, height: 55, margin: 10 }}
              dropDownContainerStyle={{ width: '90%', marginHorizontal: 20 }}
              setOpen={setOpen4}
              setValue={setValue4}
              setItems={setItems}
            />
            <View style={{width:'90%',height:200,borderWidth:2,borderColor:'#3F6EEC3D',borderRadius:10,margin:10,padding:10,flexDirection:'row'}}>
              <Chip style={{width:'32%',height:40,backgroundColor:'#3F6EEC26',margin:5}} icon="close">Front End</Chip>
              <Chip style={{width:'32%',height:40,backgroundColor:'#3F6EEC26',margin:5}} icon="close">Back End</Chip>
              <Chip style={{width:'22%',height:40,backgroundColor:'#3F6EEC26',margin:5}} icon="close">CSS</Chip>
            </View>
            <Text
              style={[styles.type, { alignSelf: 'flex-start', marginLeft: 25 }]}>
              Add atleast 3 relevent skills
            </Text>
            <TouchableOpacity
              style={[styles.document, { justifyContent: 'center' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.img} source={require('../assets/upload.png')} />
                <Text style={styles.upload}>Upload Resume</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.type}>
              File spported pdf,doc,docx,rtf,txt- Max 5MB
            </Text>
          </View>
        )}
      </View>
      <View style={{ width: '90%', marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'flex-start',
          }}>
          <CheckBox
            disabled={false}
            value={checked2}
            boxType="circle"
            tintColors={{ true: '#3F6EEC', false: '#256CFC54' }}
            onValueChange={newValue => setChecked2(newValue)}
          />
          <Text style={styles.type}>
            I agree to{' '}
            <Text style={[styles.type, { color: '#3F6EEC' }]}>
              terms & conditions{' '}
            </Text>
            and{' '}
            <Text style={[styles.type, { color: '#3F6EEC' }]}>
              Privacy & Policy
            </Text>{' '}
            & Receive Job Notification
          </Text>
        </View>
      </View>
      <MyButton
        title={'Register'}
        onPress={() => navigation.navigate('Profile')}
      />
    </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Registration;
const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    width:20,
    height:20,
    resizeMode:'cover'
  },
  input: {
    width: '90%',
    margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 200,
    fontFamily: 'MartelSans-Regular',
  },
  dinput: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'MartelSans-Regular',
  },
  inputsmall: {
    width: '42%',
    margin: 10,
    borderColor: '#4E6BB8',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 14,
    height: 55,
    borderRadius: 200,
    fontFamily: 'MartelSans-Regular',
  },
  login: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'MartelSans-Bold',
  },
  upload: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 15,
    textAlign: 'justify',
    fontFamily: 'MartelSans-Regular',
  },
  type: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
  },
  btn: {
    width: '90%',
    backgroundColor: '#F1F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    margin: 15,
  },
  btnText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'MartelSans-Regular',
    fontWeight: '400',
  },
  document: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderColor: '#256CFC54',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    margin: 10,
  },
});
