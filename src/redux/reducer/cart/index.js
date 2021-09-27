import {ADD_TO_CART, GET_CART_LIST, DELETE_CART_ITEM} from '../../action/CartAction';

const initialState = {
  setCartLoading: false,
  setCartResult: false,
  setCartError: false,

  getCartLoading: false,
  getCartResult: false,
  getCartError: false,

  deleteCartLoading: false,
  deleteCartResult: false,
  deleteCartError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        setCartLoading: action.payload.loading,
        setCartResult: action.payload.data,
        setCartError: action.payload.errorMessage,
      };

    case GET_CART_LIST:
      return {
        ...state,
        getCartLoading: action.payload.loading,
        getCartResult: action.payload.data,
        getCartError: action.payload.errorMessage,
      };
      case DELETE_CART_ITEM:
      return {
        ...state,
        deleteCartLoading: action.payload.loading,
        deleteCartResult: action.payload.data,
        deleteCartError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
