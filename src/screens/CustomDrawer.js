import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/Reducers/AuthReducer';
const CustomDrawer = props => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: '#3F6EEC'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#3F6EEC'}}>
        <View style={{flexDirection: 'row', padding: 30, alignItems: 'center'}}>
          <Image
            source={require('../assets/jhon.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <View style={{marginHorizontal: 10, marginBottom: 8}}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'MartelSans-SemiBold',
              }}>
              Good Morning
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'MartelSans-SemiBold',
              }}>
              {user?.user?.name}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontFamily: 'MartelSans-Bold',
              marginTop: 30,
              marginLeft: 30,
              marginBottom: 15,
            }}>
            Main Menu
          </Text>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Profile"
            activeTintColor="#3F6EEC0F"
            activeBackgroundColor="#3F6EEC0F"
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <Feather name="user-alt" size={30} color="#3F6EEC" />}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
          {/* <DrawerItem
            label="Message"
            activeTintColor="#3F6EEC0F"
            activeBackgroundColor="#3F6EEC0F"
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <Entypo name="message" size={30} color="#3F6EEC" />}
          /> */}
          <DrawerItem
            label="About Us"
            activeTintColor="#3F6EEC0F"
            activeBackgroundColor="#3F6EEC0F"
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => (
              <MIcon
                name="book-information-variant"
                size={30}
                color="#3F6EEC"
              />
            )}
          />
          <DrawerItem
            label="Log Out"
            activeTintColor="#3F6EEC0F"
            activeBackgroundColor="#3F6EEC0F"
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <Ionicons name="log-out" size={30} color="#3F6EEC" />}
            onPress={() => {
              dispatch(setUser(null));
              props.navigation.closeDrawer();
              props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }}
          />
          {/* <DrawerItem
            focused={true}
            label="Home"
            activeTintColor='#3F6EEC0F'
            activeBackgroundColor='#3F6EEC0F'
            style={{ marginLeft: 25 }}
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <Entypo name='home' size={30} color='#3F6EEC' />}
            onPress={() => { props.navigation.navigate("Home"); }}
          />
          <DrawerItem
            label="Notifications"
            activeTintColor='#3F6EEC0F'
            activeBackgroundColor='#3F6EEC0F'
            style={{ marginLeft: 25 }}
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <MIcon name='bell' size={30} color='#3F6EEC' />}
            onPress={() => { props.navigation.navigate("Notification"); }}
          />

          <DrawerItem
            label="Settings"
            activeTintColor='#3F6EEC0F'
            activeBackgroundColor='#3F6EEC0F'
            style={{ marginLeft: 25 }}
            labelStyle={{
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'MartelSans-SemiBold',
              fontSize: 16,
            }}
            icon={() => <Ionicons name='settings-sharp' size={30} color='#3F6EEC' />}
            onPress={() => { props.navigation.navigate("Setting"); }}
          /> */}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
export default CustomDrawer;
