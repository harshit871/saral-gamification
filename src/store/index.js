import { configureStore } from "@reduxjs/toolkit"
import gamificationReducer from "./gamificationSlice"

const store = configureStore({
  reducer: {
    gamification: gamificationReducer,
  },
})

export default store
