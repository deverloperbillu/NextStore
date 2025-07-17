import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import productReducer from './features/productSlice'
import cartReducer from './features/cartSlice'
import locationReducer from './features/locationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    location: locationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
