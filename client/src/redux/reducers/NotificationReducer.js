import { createSlice } from '@reduxjs/toolkit';

export const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    read:0,
    unread:0,
    hasLoaded: false
  },
  reducers: {
    fetchNotifications: (state, action) => {
      state.read = action.payload.data.readCount;
      state.unread = action.payload.data.unreadCount;
      state.hasLoaded = true
    },
    readNotifications:(state) =>{
      state.unread = 0
    },
    addNotification:(state) =>{
      state.unread = Number(state.unread) + 1
    }
  },
});

export const { fetchNotifications, readNotifications, addNotification } = notificationReducer.actions;

export default notificationReducer.reducer;