import { createSlice } from "@reduxjs/toolkit"


export const {
  actions: authActions,
  reducer: authReducer
} = createSlice({
  name: "auth",
  initialState: {
    isAuth: true,
    user: {}
  },
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
    },
    setUser: (state, {payload}) => {
      state.user = payload
    }
  }
})