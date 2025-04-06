import { createSlice } from '@reduxjs/toolkit';
import musicnData from '../../../assets/data/music.json';

const initialState = {
    music: musicnData.music
}

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    updateMusic: (state, action) => {
      state.music = action.payload;
    },  },
})
export const { updateMusic } = musicSlice.actions;

export default musicSlice.reducer;
