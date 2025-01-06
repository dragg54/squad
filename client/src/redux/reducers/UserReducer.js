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
    isLoggedIn: false,
    isAdmin: null
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
        isVerifiedEmail,
        isAdmin
      } = action.payload.userDetails

      state.id = id
      state.squadId = squadId
      state.userName = userName
      state.email = email
      state.firstName = firstName
      state.lastName = lastName
      state.isLoggedIn = true,
      state.isVerifiedEmail = isVerifiedEmail,
      state.isAdmin = isAdmin
      state.profileAvatar = BACKEND_SERVER_URL + "/avatars/" + profileAvatar
    },

    clearUser: (state) => {
      state.isLoggedIn = false
    },

    saveUnverifiedUser: (state, action) => {
      const {
        userName,
        email,
        firstName,
        lastName,
      } = action.payload.userDetails

      state.userName = userName
      state.email = email
      state.firstName = firstName
      state.lastName = lastName
      state.isLoggedIn = false
      state.isVerifiedEmail = false
    }
  }
},
);

export const { fetchUser, clearUser, saveUnverifiedUser } = userSlice.actions;

export default userSlice.reducer;