import { createSlice } from "@reduxjs/toolkit"

export const {
    actions: loaderActions,
    reducer: loaderReducer
} = createSlice({
    name: "loader",
    initialState: { isOpen: false, text: '' },
    reducers: {
        openLoader(state, { payload }) {
            return { isOpen: true, text: payload }
        },
        closeLoader() {
            return { isOpen: false, text: '' }
        }
    }
})