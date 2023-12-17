import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { managerAPI } from "../services/Service";
import { companyDataReducer } from "./reducers/companyDataReducer";
import { signupReducer } from "./reducers/signupReducer";
import { csvReducer } from "./reducers/csvReducer";

const rootReducer = combineReducers({
  [managerAPI.reducerPath]: managerAPI.reducer,
  company: companyDataReducer,
  signup: signupReducer,
  csv: csvReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      managerAPI.middleware
    ),
});
export default store;
