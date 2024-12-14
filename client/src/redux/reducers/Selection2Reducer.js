// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const selection2Slice = createSlice({
  name: 'selection2',
  initialState: {
    isOpen: false,
    content: [],
    selected: [],
    name:''
  },
  reducers: {
    openSelectionModal: (state, action) => {
      state.isOpen = true;
      if(!state.content.some(content => content.name == action.payload.content[0].name)){
        state.content = [...state.content, ...action.payload.content]
      }
        // state.selected = action.payload.selected;
      state.name = action.payload.name
    },
    closeSelectionModal: (state) => {
      state.isOpen = false;
      state.content = [];
    },
    selectOption: (state, action) =>{
      if(!state.selected.some(selected => action.payload.name == selected.name)){
      state.selected.push(action.payload)
      }
      else{
        const currentSelectedState = state.selected.filter(st => st.name != action.payload.name)
        state.selected= [...currentSelectedState, action.payload]
      }
    }
  },
});

export const { openSelectionModal, closeSelectionModal, selectOption } = selection2Slice.actions;

export default selection2Slice.reducer;
