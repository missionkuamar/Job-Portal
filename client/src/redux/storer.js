// Importing necessary modules from Redux Toolkit and other dependencies
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Used to combine multiple reducers and configure the Redux store
import authSlice from "./authSlice";  // Reducer for handling authentication-related state
import jobSlice from "./jobSlice";  // Reducer for managing job-related state
import { 
    persistStore, 
    persistReducer, 
    FLUSH, 
    REHYDRATE, 
    PAUSE, 
    PERSIST, 
    PURGE, 
    REGISTER 
} from 'redux-persist'; // Importing functions and constants for persistent storage
import storage from 'redux-persist/lib/storage'; // This will be used to store data in the browser's local storage
import companySlice from "./companySlice";  // Reducer for handling company-related state
import applicationSlice from "./applicationSlice"; // Reducer for handling application-related state

// Configuration object for Redux Persist to set up the storage mechanism
const persistConfig = {
    key: 'root', // The key that will be used for the persisted state in localStorage
    version: 1,  // Version of the persisted state, helps in migration if needed in the future
    storage, // Specifies the storage method, in this case, we're using localStorage
}

// Combining all the reducers into a rootReducer
const rootReducer = combineReducers({
    auth: authSlice, // Handles state for authentication
    job: jobSlice, // Handles state for jobs
    company: companySlice, // Handles state for company data
    application: applicationSlice, // Handles state for applications
})

// Wrapping the rootReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store with persistedReducer
const store = configureStore({
    reducer: persistedReducer, // Use the persistedReducer instead of rootReducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these specific Redux Persist actions to avoid errors with non-serializable data
            },
        }),
});

export default store;  // Exporting the store to be used in the application
