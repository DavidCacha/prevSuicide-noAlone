import { configureStore } from '@reduxjs/toolkit'
import conversationsReducer from '../features/conversations/conversationsSlice';
import contactReducer from '../features/contact/contactSlice';
import musicReducer from '../features/music/musicSlice';
import profileReducer from '../features/profile/profileSlice';
import locationReducer from '../features/location/locationSlice';
import asistentReducer from '../features/asistent/asistentSlice'

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    contacts: contactReducer,
    music: musicReducer,
    profile:profileReducer, 
    location:locationReducer,
    asistent:asistentReducer
  },
})