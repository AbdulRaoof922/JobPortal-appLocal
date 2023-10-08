import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet} from 'react-native';
import SearchJobs from '../screens/SearchJobs';
import MainHeader from '../component/MainHeader';
import Profile from '../screens/Profile';
import Main from '../screens/Main';
import ComingSoon from '../component/ComingSoon';
const Tab = createBottomTabNavigator();
function BottomTabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#FFF',
          elevation: 10,
          shadowColor: '#fafafa',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 50,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#3F6EEC',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.iconContainer}>
                <Icon
                  name="home"
                  color={focused ? '#3F6EEC' : 'gray'}
                  size={30}
                />
                <Text
                  style={[
                    styles.textStyle,
                    focused ? {color: '#3F6EEC'} : null,
                  ]}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={SearchJobs}
        options={{
          header: () => <MainHeader title="Search jobs" />,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.iconContainer}>
                <Icon
                  name="briefcase-search-outline"
                  color={focused ? '#3F6EEC' : 'gray'}
                  size={30}
                />
                <Text
                  style={[
                    styles.textStyle,
                    focused ? {color: '#3F6EEC'} : null,
                  ]}>
                  Jobs
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Services"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.iconContainer}>
                <Icon
                  name="briefcase-account-outline"
                  color={focused ? '#3F6EEC' : 'gray'}
                  size={30}
                />
                <Text
                  style={[
                    styles.textStyle,
                    focused ? {color: '#3F6EEC'} : null,
                  ]}>
                  Services
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Courses"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.iconContainer}>
                <Icon
                  name="school-outline"
                  color={focused ? '#3F6EEC' : 'gray'}
                  size={30}
                />
                <Text
                  style={[
                    styles.textStyle,
                    focused ? {color: '#3F6EEC'} : null,
                  ]}>
                  Courses
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <MainHeader title="Profile" />,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.iconContainer}>
                <Icon
                  name="account-outline"
                  color={focused ? '#3F6EEC' : 'gray'}
                  size={30}
                />
                <Text
                  style={[
                    styles.textStyle,
                    focused ? {color: '#3F6EEC'} : null,
                  ]}>
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'MartelSans-Regular',
    fontSize: 13,
    fontStyle: 'normal',
    color: '#000',
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BottomTabNavigator;
