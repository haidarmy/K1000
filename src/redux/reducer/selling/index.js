import { GET_LIST_SALE, UPDATE_STATUS_SALE } from "../../action/SellingAction";

  
  const initialState = {
    getListSellingLoading: false,
    getListSellingResult: false,
    getListSellingError: false,

    updateStatusSellingLoading: false,
    updateStatusSellingResult: false,
    updateStatusSellingError: false,    
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_LIST_SALE:
        return {
          ...state,
          getListSellingLoading: action.payload.loading,
          getListSellingResult: action.payload.data,
          getListSellingError: action.payload.errorMessage,
        };
        case UPDATE_STATUS_SALE:
          return {
            ...state,
            updateStatusSellingLoading: action.payload.loading,
            updateStatusSellingResult: action.payload.data,
            updateStatusSellingError: action.payload.errorMessage,
          };
      default:
        return state;
    }
  }
  