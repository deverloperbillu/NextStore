import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LocationState {
  selected: string | null
}

const initialState: LocationState = {
  selected: null,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    },
  },
})

export const { setLocation } = locationSlice.actions
export default locationSlice.reducer
