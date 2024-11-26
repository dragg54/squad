// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {
        id: null,
        title: null,
        description:'',
        fieldOpened: false,
    },
    postComments:[]
  },
  reducers: {
    fetchPost: (state, action) => {
       state.post = action.payload.post
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openPopup, closePopup } = postSlice.actions;

export default postSlice.reducer;
