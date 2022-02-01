import { CALCULATE_SHIPPING_COST } from "../../action/RajaOngkir";

const initialState = {
 shippingLoading: false,
 shippingResult: false,
 shippingError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CALCULATE_SHIPPING_COST:
      return {
        ...state,
       shippingLoading: action.payload.loading,
       shippingResult: action.payload.data,
       shippingError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
