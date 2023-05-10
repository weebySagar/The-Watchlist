import {configureStore, } from '@reduxjs/toolkit'
import { fetchApi } from './api'
import homeSlice from './slice'

export const store= configureStore({
    reducer:{
        home:homeSlice,
        [fetchApi.reducerPath]:fetchApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(fetchApi.middleware)
})