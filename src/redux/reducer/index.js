import { combineReducers } from "redux";
import AuthReducer from './auth'
import LoadingReducer from './loading'
import ProfileReducer from './profile'
import CategoryReducer from './category'
import ProductReducer from './product'

const rootReducer = combineReducers({
    AuthReducer,
    LoadingReducer,
    ProfileReducer,
    CategoryReducer,
    ProductReducer
})

export default rootReducer