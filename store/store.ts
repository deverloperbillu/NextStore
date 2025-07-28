import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage use karega

import authReducer from './features/authSlice'
import productReducer from './features/productSlice'
import cartReducer from './features/cartSlice'
import locationReducer from './features/locationSlice'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['products'], // isko persist nahi karna (optional)
}

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  location: locationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
