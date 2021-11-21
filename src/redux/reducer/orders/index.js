import {UPDATE_ORDER, UPDATE_STATUS_ORDER} from '../../action/OrderAction';
import {GET_LIST_ORDER} from '../../action/OrderAction';

const initialState = {
  updateOrderLoading: false,
  updateOrderResult: false,
  updateOrderError: false,

  getListOrderLoading: false,
  getListOrderResult: false,
  getListOrderError: false,

  updateStatusOrderLoading: false,
  updateStatusOrderResult: false,
  updateStatusOrderError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return {
        ...state,
        updateOrderLoading: action.payload.loading,
        updateOrderResult: action.payload.data,
        updateOrderError: action.payload.errorMessage,
      };
    case GET_LIST_ORDER:
      return {
        ...state,
        getListOrderLoading: action.payload.loading,
        getListOrderResult: action.payload.data,
        getListOrderError: action.payload.errorMessage,
      };
    case UPDATE_STATUS_ORDER:
      return {
        ...state,
        updateStatusOrderLoading: action.payload.loading,
        updateStatusOrderResult: action.payload.data,
        updateStatusOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
