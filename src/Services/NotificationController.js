import Toast from 'react-native-toast-message';
import {navigationRef} from '../../App';
import messaging from '@react-native-firebase/messaging';
export const initNotifications = (
  navigation = navigationRef?.current,
  user,
) => {
  initNotificationListeners(navigation, user);
  initForegroundMessage(navigation);
};

export const initNotificationListeners = (navigation, user) => {
  messaging()
    .getInitialNotification()
    .then(message => {});

  messaging().onNotificationOpenedApp(message => {});
};

export const initForegroundMessage = navigation => {
  return messaging().onMessage(async remoteMessage => {
    onMessageReceived(remoteMessage, navigation);
  });
};

export const onMessageReceived = (message, navigation) => {
  Toast.show({
    type: 'ToastMessage',
    text1: message.notification.title,
    text2: message.notification.body,
    onPress: () => {
      Toast.hide();
    },
  });
};

// export const onAlertReceiving = async (alertId) => {
//     axios.post(`${baseUrl.url}${alertReceived}`, {
//         alertId: alertId
//     }).then(function (response) {
//
//     }).catch(function (error) {
//
//     })
// }
