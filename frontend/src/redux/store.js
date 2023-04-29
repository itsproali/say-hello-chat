import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import apiBase from "./apiBase";

// Import all reducers here
import userSlice from "./user/userSlice";
import chatSlice from "./chat/chatSlice";

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
  [apiBase.reducerPath]: apiBase.reducer,
});

const persistConfig = {
  key: "say-hello",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiBase.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
