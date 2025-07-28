import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LocationState {
  selected: string | null
  // Add other properties here if needed, for example:
  // locations?: Record<string, string>
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
