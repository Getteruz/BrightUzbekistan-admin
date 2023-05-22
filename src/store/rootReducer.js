import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { alertReducer } from "./alert/alert.slice";
import { authReducer } from "./auth/auth.slice";
import { loaderReducer } from "./loader/loader.slice";
import storage from "redux-persist/lib/storage"

const authPersistConfig = {
  key: "auth",
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
  loader: loaderReducer
})

export default rootReducer