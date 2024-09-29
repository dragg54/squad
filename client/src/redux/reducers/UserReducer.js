import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    userName: null,
    email: null,
    firstName: null,
    lastName: null
  },
  reducers: {
    fetchUser: (state, action) => {
        const {
            id,
            userName,
            email,
            firstName,
            lastName
        } = action.payload.userDetails
      state.id = id
      state.userName = userName,
      state.email = email,
      state.firstName = firstName,
      state.lastName = lastName
    }
  },
});

export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;