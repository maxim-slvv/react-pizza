import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

//TODO: сделать нормальное отображение цены в корзине - при удалении товаров - ценник не меняется

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: string;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      // получbть полностью id
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem !== undefined) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
