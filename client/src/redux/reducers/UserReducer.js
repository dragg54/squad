import { createSlice } from '@reduxjs/toolkit';
import { BACKEND_SERVER_URL } from '../../Appconfig';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    squadId: null,
    userName: null,
    email: null,
    firstName: null,
    lastName: null,
    isLoggedIn: false
  },
  reducers: {
    fetchUser: (state, action) => {
        const {
            id,
            squadId,
            userName,
            email,
            firstName,
            lastName,
            profileAvatar,
        } = action.payload.userDetails

      state.id = id
      state.squadId = squadId
      state.userName = userName
      state.email = email
      state.firstName = firstName
      state.lastName = lastName
      state.isLoggedIn = true,
      state.profileAvatar = BACKEND_SERVER_URL+"/avatars/"+profileAvatar
    }
  },
});

export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;