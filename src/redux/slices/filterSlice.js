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
      console.log(action);
      //*вот мы и сохраняем в стейт то
      //*что прийдет в action.payload
      state.categoryId = action.payload;
    },

    // setSort(){

    // },
    // setOrderType(){

    // }
  },
});

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
