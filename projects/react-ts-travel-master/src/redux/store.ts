import { createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import  { actionLog } from './middlewares/actionLog'

import { productDetailSlice } from './productDetail/slice'
import { userSlice } from './user/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { orderSlice } from './order/slice'
import { combineReducers,configureStore } from "@reduxjs/toolkit";


import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], //需要缓存的数据
    blacklist: ["language","recommendProducts","productDetail"] //不需要缓存的数据
}



const rootReducer =  combineReducers({
    language:  languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail:productDetailSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order:orderSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog))

const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default {
    store,
    persistor
} 


// redux 公式

// const middleware = (store) => (next) => (action) => {} 