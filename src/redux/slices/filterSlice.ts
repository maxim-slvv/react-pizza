import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ListItem } from '../../components/Sort';

export type SortInclude = {
  sort: ListItem;
};
export interface FilterSlice {
  categoryId: number;
  searchValue: string;
  sortType: ListItem;
  orderType: string;
  currentPage: number;
  sort: {};
}

const initialState: FilterSlice = {
  categoryId: 0,
  searchValue: '',
  sortType: { name: 'популярности', type: 'asc', sortProperty: 'rating' },
  orderType: 'asc',
  currentPage: 1,
  sort: {
    name: 'цене',
    type: 'desc',
    sortProperty: 'price',
  },
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
    setSortType(state, action: PayloadAction<ListItem>) {
      state.sortType = action.payload;
    },
    setOrderType(state, action: PayloadAction<string>) {
      state.orderType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSlice & SortInclude>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType.sortProperty = action.payload.sort.sortProperty;
      state.orderType = action.payload.orderType;
      state.currentPage = Number(action.payload.currentPage);
      state.sortType.name = action.payload.sort.name;
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
