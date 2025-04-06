import { createSlice } from '@reduxjs/toolkit';
import contactData from '../../../assets/data/contactEmergency.json';

const initialState = {
    contacts: contactData.emergency_contacts
}

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateContact: (state, action) => {
      state.contacts = action.payload;
    },  },
})
export const { updateContact } = contactSlice.actions;

export default contactSlice.reducer;
