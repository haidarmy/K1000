import {combineReducers} from 'redux';
import AuthReducer from './auth';
import LoadingReducer from './loading';
import ProfileReducer from './profile';
import CategoryReducer from './category';
import ProductReducer from './product';
import CartReducer from './cart';
import ShippingReducer from './rajaongkir';
import WishlistReducer from './wishlist';
import StoreReducer from './store';
import PaymentReducer from './payment';
import OrdersReducer from './orders';
import SellingReducer from './selling';
import WithdrawReducer from './withdraw';
import DarkModeReducer from './darkmode';
import SalesReportReducer from './sales-report';
import ExpenditureReportReducer from './expenditure-report';

const rootReducer = combineReducers({
  AuthReducer,
  LoadingReducer,
  ProfileReducer,
  CategoryReducer,
  ProductReducer,
  CartReducer,
  ShippingReducer,
  WishlistReducer,
  StoreReducer,
  PaymentReducer,
  OrdersReducer,
  SellingReducer,
  WithdrawReducer,
  DarkModeReducer,
  SalesReportReducer,
  ExpenditureReportReducer,
});

export default rootReducer;
