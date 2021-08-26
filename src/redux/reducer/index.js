import { combineReducers } from "redux";
import AuthReducer from './auth'
import LoadingReducer from './loading'
import ProfileReducer from './profile'

const rootReducer = combineReducers({
    AuthReducer,
    LoadingReducer,
    ProfileReducer,
})

export default rootReducer