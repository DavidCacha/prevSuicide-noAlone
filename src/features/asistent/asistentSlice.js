import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    asistent: 'Selene'
}

const asistentSlice = createSlice({
  name: 'asistent',
  initialState,
  reducers: {
    updateAsistent: (state, action) => {
      state.asistent = action.payload;
    },  },
})
export const { updateAsistent } = asistentSlice.actions;

export default asistentSlice.reducer;