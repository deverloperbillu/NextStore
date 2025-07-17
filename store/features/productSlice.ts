import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  description: string
  price: number
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('/api/products')
  return res.json()
})

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
  },
})

export default productSlice.reducer
