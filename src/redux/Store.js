import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import authReducer from './Reducers/AuthReducer';
import commonReducer from './Reducers/CommonReducer';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer({...config}, authReducer),
    common: commonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
export default store;
