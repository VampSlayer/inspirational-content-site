import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

export const tileSlice = createSlice({
	name: "counter",
	initialState: {
		value: (() => {
			return localStorage.getItem("tiles")
				? JSON.parse(localStorage.getItem("tiles"))
				: [{ id: uuidv4(), type: null, feed: null, setting: true }]
		})(), // https://advancedweb.hu/the-async-lazy-initializer-pattern-in-javascript/
	},
	reducers: {
		add: (state) => {
			if (state.value.length === 18) return
			state.value.push({
				id: uuidv4(),
				type: null,
				feed: null,
				setting: false,
			})
			localStorage.setItem("tiles", JSON.stringify(state.value))
		},
		remove: (state, action) => {
			const id = action.payload.id
			const index = state.value.findIndex((x) => x.id === id)

			if (index === -1) return

			state.value.splice(index, 1)
			localStorage.setItem("tiles", JSON.stringify(state.value))
		},
		update: (state, action) => {
			const tile = action.payload.tile
			const index = state.value.findIndex((x) => x.id === tile?.id)

			if (index === -1) return

			const stateTile = state.value[index]
			Object.keys(stateTile).forEach((tileKey) => {
				if (tile[tileKey] === undefined) return
				if (stateTile[tileKey] !== tile[tileKey])
					stateTile[tileKey] = tile[tileKey]
			})
			localStorage.setItem("tiles", JSON.stringify(state.value))
		},
	},
})

export const { add, remove, update } = tileSlice.actions

export default tileSlice.reducer
