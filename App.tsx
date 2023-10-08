import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { StatusBar } from 'react-native'; // Import StatusBar
import MyDrawer from './src/navigation/MyDrawer';
import { Provider } from "react-redux";
import store, { persister } from "./src/redux/Store";
import { PersistGate } from "redux-persist/integration/react";

export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer>
          <StatusBar backgroundColor="white" barStyle="dark-content" /> 
          <MyDrawer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
