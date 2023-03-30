import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  orderType: 'asc',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setOrderType(state, action) {
      console.log(action);
      state.filter = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setOrderType } = filterSlice.actions;

export default filterSlice.reducer;
