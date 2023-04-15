import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortSlice = {
  name: 'популярности' | 'цене' | 'алфавиту';
  sortProperty: 'rating' | 'price' | 'title';
};

interface FilterSlice {
  categoryId: number;
  searchValue: string;
  sortType: SortSlice;
  orderType: string;
  currentPage: number;
  sort: string;
}

const initialState: FilterSlice = {
  categoryId: 0,
  searchValue: '',
  sortType: { name: 'популярности', sortProperty: 'rating' },
  orderType: 'asc',
  currentPage: 1,
  sort: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<SortSlice>) {
      state.sortType = action.payload;
    },
    setOrderType(state, action: PayloadAction<string>) {
      state.orderType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSlice>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType.sortProperty = action.payload.sortType.sortProperty;
      state.orderType = action.payload.orderType;
      state.currentPage = Number(action.payload.currentPage);
      state.sortType.name = action.payload.sortType.name;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setOrderType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
