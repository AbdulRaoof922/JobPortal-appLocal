import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Verification from '../screens/Verification';
import ChangePassword from '../screens/ChangePassword';
import ForgetPassword from '../screens/ForgetPassword';
import CreateAccount from '../screens/CreateAccount';
import Profile from '../screens/Profile';
import Registration from '../screens/Registration';
import Category from '../screens/Category';
import CategoryDetails from '../screens/CategoryDetails';
import Notification from '../screens/Notification';
import JobDetails from '../screens/JobDetails';
import {Image, StyleSheet, View} from 'react-native';
import BottomTabNavigator from './BottomNavigation';
import MainHeader from '../component/MainHeader';
import ApplyJob from '../screens/ApplyJob';
import AppliedJobs from '../screens/AppliedJobs';
import {useSelector} from 'react-redux';
import SelectRoleScreen from '../screens/SelectRoleScreen';
import SignUpDetailsFresher from '../screens/SignUpDetailsFresher';
import SignUpEducationDetailsFresher from '../screens/SignUpEducationDetailsFresher';
import PersonalDetailFresher from '../screens/PersonalDetailFresher';
import OthersFresher from '../screens/OthersFresher';
import SignUpEmployment from '../screens/SignUpEmployment';
import SignUpDesiredCareerProfile from '../screens/SignUpDesiredCarrerProfile';
const Stack = createStackNavigator();
const MyStack = () => {
  const onBoarding = useSelector(state => state.auth.splash);
  const user = useSelector(state => state.auth.user);

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        animationEnabled: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={
        onBoarding ? (user ? 'Main' : 'Login') : 'SplashScreen'
      }>
      {/* <Stack.Navigator initialRouteName="Personal"> */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Others" component={OthersFresher} />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="SelectRole"
        component={SelectRoleScreen}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="SignUpDetailsFresher"
        component={SignUpDetailsFresher}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="SignUpEducationDetailsFresher"
        component={SignUpEducationDetailsFresher}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="AppliedJobs"
        component={AppliedJobs}
        options={{
          headerTitle: 'Applied Jobs',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'MartelSans-SemiBold',
            fontWeight: '600',
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'MartelSans-SemiBold',
            fontWeight: '600',
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'MartelSans-SemiBold',
            fontWeight: '600',
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Personal"
        component={PersonalDetailFresher}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="SignUpEmployment"
        component={SignUpEmployment}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="SignUpDesiredCarrerProfile"
        component={SignUpDesiredCareerProfile}
        options={{headerTitleStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          header: props => <MainHeader title="Category" props={props} />,
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{header: () => <MainHeader title="Job Details" />}}
      />
      <Stack.Screen
        name="ApplyJob"
        component={ApplyJob}
        options={{header: () => <MainHeader title="Sending Resume" />}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 30,
    resizeMode: 'contain',
  },
});
export default MyStack;
