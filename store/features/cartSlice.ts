import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  instructions?: string
}

interface CartState {
  items: CartItem[]
  drawerOpen: boolean
}

const initialState: CartState = {
  items: [],
  drawerOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
    const item = state.items.find(i => i.id === action.payload.id)
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity
      }
    }
  },
})

export const selectCartSummary = (state: RootState) => {
  const totalItems = state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return { totalItems, totalPrice }
}

// ✅ FIXED EXPORT
export const { addToCart, removeFromCart, clearCart, toggleDrawer, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
