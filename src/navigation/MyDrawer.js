import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../screens/Notification';
import Setting from '../screens/Setting';
import MyStack from './MyStack';
import CustomDrawer from '../screens/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerActiveBackgroundColor: '#3F6EEC0F',
        drawerActiveTintColor: '#000000',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: {
          fontWeight: '600',
          fontFamily: 'MartelSans-SemiBold',
          fontSize: 16,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={MyStack}
        options={{
          headerShown: false,
          headerTitle: 'Home',
          drawerIcon: () => <Entypo name="home" size={30} color="#3F6EEC" />,
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          swipeEnabled: true,
          drawerIcon: () => <MIcon name="bell" size={30} color="#3F6EEC" />,
        }}
      />
      {/* <Drawer.Screen name="Setting" component={Setting} options={{
        swipeEnabled:true,
        drawerIcon:()=><Ionicons name='settings-sharp' size={30} color='#3F6EEC' />
        }}/> */}
    </Drawer.Navigator>
  );
}
export default MyDrawer;
