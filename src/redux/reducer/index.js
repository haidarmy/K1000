import { combineReducers } from "redux";
import AuthReducer from './auth'
import LoadingReducer from './loading'
import ProfileReducer from './profile'
import CategoryReducer from './category'
import ProductReducer from './product'
import CartReducer from './cart'
import ShippingReducer from './rajaongkir'
import WishlistReducer from './wishlist'
import StoreReducer from './store'

const rootReducer = combineReducers({
    AuthReducer,
    LoadingReducer,
    ProfileReducer,
    CategoryReducer,
    ProductReducer,
    CartReducer,
    ShippingReducer,
    WishlistReducer,
    StoreReducer
})

export default rootReducer