// import {configureStore} from '@reduxjs/toolkit';
// import userNameReducer from '../features_Redux/userName';

// export const store = configureStore({
//     reducer:{
//         UserName:userNameReducer,
//     }
// })

import { configureStore } from '@reduxjs/toolkit';
import userNameReducer from '../features_Redux/userName';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    UserName: userNameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
