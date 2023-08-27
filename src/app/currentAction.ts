import { createSlice } from '@reduxjs/toolkit'

export const currentActionSlice = createSlice({
  name: 'currentAction',
  initialState: {
    active: false
  },
  reducers: {
    setActive: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.active = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActive } = currentActionSlice.actions

export default currentActionSlice.reducer
