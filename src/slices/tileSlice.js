import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

export const tileSlice = createSlice({
	name: "counter",
	initialState: {
		value: (() => {
			return localStorage.getItem("tiles")
				? JSON.parse(localStorage.getItem("tiles"))
				: [{ id: uuidv4(), type: "empty", feed: "" }]
		})(), // https://advancedweb.hu/the-async-lazy-initializer-pattern-in-javascript/
	},
	reducers: {
		add: (state) => {
			if (state.value.length === 18) return
			state.value.push({ id: uuidv4(), type: "empty", feed: "" })
			localStorage.setItem("tiles", JSON.stringify(state.value))
		},
		remove: (state, action) => {
			const index = state.value.findIndex((x) => x.id === action.payload.id)
			if (index === -1) return
			state.value.splice(index, 1)
			localStorage.setItem("tiles", JSON.stringify(state.value))
		},
	},
})

export const { add, remove } = tileSlice.actions

export default tileSlice.reducer
