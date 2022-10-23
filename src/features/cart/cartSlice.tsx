import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
import type { RootState } from '../../app/store'
import { CartItemType } from '../../CartItemType'
import axios from 'axios'

const url: string = 'https://course-api.com/react-useReducer-cart-project'

interface CartState {
  cartItems: CartItemType[] | []
  amount: number
  total: number
  isLoading: boolean
}

const initialState: CartState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk<CartItemType[]>(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state: CartState) => {
      state.cartItems = []
    },
    removeItem: (state: CartState, action: PayloadAction<string>) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter(
        (item: CartItemType) => item.id !== itemId,
      )
    },
    increase: (state: CartState, action: PayloadAction<string>) => {
      const cartItem: CartItemType | undefined = state.cartItems.find(
        (item: CartItemType) => item.id === action.payload,
      )
      if (cartItem) {
        cartItem.amount = cartItem.amount + 1
      }
    },
    decrease: (state: CartState, action: PayloadAction<string>) => {
      const cartItem: CartItemType | undefined = state.cartItems.find(
        (item: CartItemType) => item.id === action.payload,
      )
      if (cartItem) {
        cartItem.amount = cartItem.amount - 1
      }
    },
    calculateTotals: (state: CartState) => {
      let amount: number = 0
      let total: number = 0
      state.cartItems.forEach((item: CartItemType) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CartState>) => {
    builder.addCase(getCartItems.pending, (state: CartState) => {
      state.isLoading = true
    })
    builder.addCase(
      getCartItems.fulfilled,
      (state: CartState, action: PayloadAction<CartItemType[]>) => {
        state.isLoading = false
        state.cartItems = action.payload
      },
    )
    builder.addCase(getCartItems.rejected, (state: CartState) => {
      state.isLoading = false
    })
  },
})

export default cartSlice.reducer
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions
export const selectCartItems = (state: RootState) => state.cart
