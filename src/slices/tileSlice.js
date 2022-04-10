import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const tileSlice = createSlice({
  name: 'counter',
  initialState: {
    value: (() => {return localStorage.getItem('tiles') ? JSON.parse(localStorage.getItem('tiles')) : [{id:uuidv4(),type:"empty",feed:""}]})(), // https://advancedweb.hu/the-async-lazy-initializer-pattern-in-javascript/
  },
  reducers: {
    increment: (state) => {
      const id = uuidv4()
      state.value.push({id:id,type:"empty",feed:""})
      localStorage.setItem('tiles', JSON.stringify(state.value))
    },
    decrement: (state, action) => {
      const index = state.value.findIndex(x => x.id === action.payload.id)
      if (index === -1 ) return
      state.value.splice(index, 1)
      localStorage.setItem('tiles', JSON.stringify(state.value))
    },
  },
})

export const { increment, decrement } = tileSlice.actions

export default tileSlice.reducer