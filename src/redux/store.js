import { configureStore } from '@reduxjs/toolkit'

import AnalyticsSlice from './slices/AnalyticsSlice.js'
import AuthSlice from './slices/AuthSlice.js'


const store = configureStore({
    reducer: {
        auth: AuthSlice,
        analytics: AnalyticsSlice
    },
    devTools: true
})

export default store