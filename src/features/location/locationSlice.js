import { createSlice } from '@reduxjs/toolkit';
import locationData from '../../../assets/data/location.json';

const initialState = {
    location: locationData.location
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      state.location = action.payload;
    },  },
})
export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;