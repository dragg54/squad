import { createSlice } from '@reduxjs/toolkit';

export const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: null
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const { setMessage } = notificationReducer.actions;

export default notificationReducer.reducer;