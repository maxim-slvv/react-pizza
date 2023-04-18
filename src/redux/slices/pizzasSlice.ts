import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { page, category, sortBy, order, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://640c843094ce1239b0af1fc8.mockapi.io/pizzas?${page}${category}${sortBy}${order}${search}`,
    );
    return data;
  },
);

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  sizes: number[];
  types: number[];
  price: number;
  category?: number;
  rating?: number;
  description?: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        alert('Ошибка загрузки питс');
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
