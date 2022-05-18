import { configureStore } from '@reduxjs/toolkit'
import reducerIndex from './slices/reducer';

const store = configureStore({
    reducer: reducerIndex
})

export default store;