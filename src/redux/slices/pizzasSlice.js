import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { page, category, sortBy, order, search } = params;
  const { data } = await axios.get(
    `https://-640c843094ce1239b0af1fc8.mockapi.io/pizzas?${page}${category}${sortBy}${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        console.log('Идет отправка');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
        console.log(state, 'все ОК');
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        console.log('Была ошибка');
      });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     console.log('Идет отправка');
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state, 'все ОК');
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log('Была ошибка');
  //   },
  // },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
