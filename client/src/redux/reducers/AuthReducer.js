import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: 'authToken',
  initialState: {
    token: null
  },
  reducers: {
    fetchToken: (state, action) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { fetchToken, clearToken } = authReducer.actions;

export default authReducer.reducer;