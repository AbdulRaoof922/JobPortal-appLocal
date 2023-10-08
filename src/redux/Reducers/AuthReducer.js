import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    splash: false,
    signUpRole: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSplash: (state, action) => {
      state.splash = action.payload;
    },
    setSignUpRole: (state, action) => {
      state.signUpRole = action.payload;
    },
    resetAuth: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {setToken, setUser, setSplash, setSignUpRole} = authSlice.actions;
export default authSlice.reducer;
