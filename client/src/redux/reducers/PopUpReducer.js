// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const popupModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    content: null,
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openPopup, closePopup } = popupModalSlice.actions;

export default popupModalSlice.reducer;
