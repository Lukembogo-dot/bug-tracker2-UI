import { persistReducer } from "redux-persist";
import { persistStore as createPersistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { usersAPI } from "../features/auth/usersAPI";
import { bugsAPI } from "../features/bugs/bugsAPI";
import { commentsAPI } from "../features/comments/commentsAPI";
import { projectsAPI } from "../features/projects/projectsAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [usersAPI.reducerPath, bugsAPI.reducerPath, commentsAPI.reducerPath, projectsAPI.reducerPath]
}

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [bugsAPI.reducerPath]: bugsAPI.reducer,
  [commentsAPI.reducerPath]: commentsAPI.reducer,
  [projectsAPI.reducerPath]: projectsAPI.reducer,
})
export const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(usersAPI.middleware).concat(bugsAPI.middleware).concat(commentsAPI.middleware).concat(projectsAPI.middleware),
    devTools: import.meta.env.MODE !== 'production'
});

export const persistor = createPersistStore(store);
export const persistStore = persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;