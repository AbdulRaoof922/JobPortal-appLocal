import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import MyButton from '../component/MyButton';
import {useDispatch} from 'react-redux';
import {setSplash} from '../redux/Reducers/AuthReducer';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/back.png')}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <Image style={styles.img} source={require('../assets/girl4x.png')} />
      <View style={{width: '60%', margin: 10}}>
        <Text style={styles.start}>Let's start your career with us now </Text>
      </View>
      <View style={{width: '90%', margin: 10}}>
        <Text style={styles.txt}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem{' '}
        </Text>
      </View>
      <MyButton
        title={'Get Started'}
        onPress={() => {
          dispatch(setSplash(true));
          navigation.navigate('Login');
        }}
      />
    </ImageBackground>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777777',
    fontFamily: 'MartelSans-Regular',
  },
  start: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3F6EEC',
    fontWeight: '700',
    lineHeight: 30,
    fontFamily: 'MartelSans-Regular',
  },
  img: {
    height: 450,
    width: 300,
    resizeMode: 'contain',
  },
});
