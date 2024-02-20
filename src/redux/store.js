import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AnalyticsSlice from './slices/AnalyticsSlice.js'
import AuthSlice from './slices/AuthSlice.js'

const authPersistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthSlice);


const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        analytics: AnalyticsSlice
    },
    devTools: true
})

export const persistor = persistStore(store)
export default store