// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const globalModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    content: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
    modifyModalProp: (state) =>{
      state.isOpen = true
    }
  },
});

export const { openModal, closeModal } = globalModalSlice.actions;

export default globalModalSlice.reducer;
