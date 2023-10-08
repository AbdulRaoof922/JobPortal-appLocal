import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    signUpFresher: null,
    signUpProfessional: null,
  },
  reducers: {
    setSignUpFresher: (state, action) => {
      state.signUpFresher = action.payload;
    },
    setSignUpProfessional: (state, action) => {
      state.signUpProfessional = action.payload;
    },
  },
});

export const {setSignUpFresher, setSignUpProfessional} = commonSlice.actions;
export default commonSlice.reducer;
