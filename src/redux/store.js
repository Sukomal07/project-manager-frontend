import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from './slices/AuthSlice.js'

const store = configureStore({
    reducer: {
        auth: AuthSlice
    },
    devTools: true
})

export default store