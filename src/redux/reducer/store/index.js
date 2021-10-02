import { GET_STORE_PRODUCT } from "../../action/StoreAction";
  
  const initialState = {
    getStoreProductLoading: false,
    getStoreProductResult: false,
    getStoreProductError: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_STORE_PRODUCT:
        return {
          ...state,
          getStoreProductLoading: action.payload.loading,
          getStoreProductResult: action.payload.data,
          getStoreProductError: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  }
  