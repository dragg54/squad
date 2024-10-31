// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalModalReducer from './reducers/GlobalModalReducer';
import popupModalReducer from './reducers/PopUpReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './reducers/UserReducer';
import  authReducer  from './reducers/AuthReducer';
import  notificationReducer  from './reducers/NotificationReducer';

const persistConfig = {
    key: "root",
    storage,
    blacklist: [ 'globalModal', 'popup']
  
  }

export const rootReducer = combineReducers({
    globalModal: globalModalReducer,
    popup: popupModalReducer,
    user: userReducer,
    auth: authReducer,
    notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat()
});
export const persistor = persistStore(store)
export default store;