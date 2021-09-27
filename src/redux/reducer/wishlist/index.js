import { ADD_TO_WISHLIST, GET_WISHLIST_LIST, DELETE_WISHLIST_ITEM } from "../../action/WishlistAction";

const initialState = {
  setWishlistLoading: false,
  setWishlistResult: false,
  setWishlistError: false,

  getWishlistLoading: false,
  getWishlistResult: false,
  getWishlistError: false,

  deleteWishlistLoading: false,
  deleteWishlistResult: false,
  deleteWishlistError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        setWishlistLoading: action.payload.loading,
        setWishlistResult: action.payload.data,
        setWishlistError: action.payload.errorMessage,
      };
    case GET_WISHLIST_LIST:
      return {
        ...state,
        getWishlistLoading: action.payload.loading,
        getWishlistResult: action.payload.data,
        getWishlistError: action.payload.errorMessage,
      };
      case DELETE_WISHLIST_ITEM:
      return {
        ...state,
        deleteWishlistLoading: action.payload.loading,
        deleteWishlistResult: action.payload.data,
        deleteWishlistError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
