import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  orderType: 'asc',
  currentPage: 1,
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
      state.orderType = action.payload;
    },
    setCurrentPage(state, action) {
      console.log(action.payload);
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setOrderType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
