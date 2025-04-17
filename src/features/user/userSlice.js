import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    token: null,
    usuario: {
      usuario: {}
    }
  }
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    }},
    updateUser: (state, action) => {
      state.userData.usuario.usuario = {
        ...state.userData.usuario.usuario,
        ...action.payload
      };
    }
    
})
export const { updateUserData, updateUser } = userSlice.actions;

export default userSlice.reducer;