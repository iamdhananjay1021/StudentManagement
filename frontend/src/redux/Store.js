import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/StudentSlice.js';


export const store = configureStore({
	reducer: {
		students: studentReducer,
	},
})