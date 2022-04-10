import { configureStore } from "@reduxjs/toolkit"

import tileReducer from "./slices/tileSlice"

export default configureStore({
	reducer: {
		tile: tileReducer,
	},
})
