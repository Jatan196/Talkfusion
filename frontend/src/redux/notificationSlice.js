// src/redux/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications:null
  }, 
  reducers: { // reducers are functions that manipulate the state 
    setNotification: (state, action) => {
      state.notifications=action.payload;
    },
    // removeNotification: (state, action) => {
    //   return state.filter(notification => notification!== action.payload);
    // },  
    // clearNotifications: () => {
    //   return [];
    // }
  }
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
