import { createSlice } from '@reduxjs/toolkit';
import profileData from '../../../assets/data/user.json';

const initialState = {
    profile: profileData
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
