// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalModalReducer from './reducers/GlobalModalReducer';
import popupModalReducer from './reducers/PopUpReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './reducers/UserReducer';
import  authReducer  from './reducers/AuthReducer';
import  notificationReducer  from './reducers/NotificationReducer';
import selection2Reducer from './reducers/Selection2Reducer'

const persistConfig = {
    key: "root",
    storage,
    blacklist: [ 'globalModal', 'popup', 'selection2']
  
  }

export const rootReducer = combineReducers({
    globalModal: globalModalReducer,
    popup: popupModalReducer,
    user: userReducer,
    auth: authReducer,
    notification: notificationReducer,
    selection2: selection2Reducer
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