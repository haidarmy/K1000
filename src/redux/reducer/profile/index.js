import {UPDATE_PROFILE} from '../../action/ProfileAction';
import { UPDATE_ADDRESS } from '../../action/ProfileAction';

const initialState = {
  updateProfileLoading: false,
  updateProfileResult: false,
  updateProfileError: false,

  updateAddressLoading: false,
  updateAddressResult: false,
  updateAddressError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      console.log("Halo from profilereducer")
      return {
        ...state,
        updateProfileLoading: action.payload.loading,
        updateProfileResult: action.payload.data,
        updateProfileError: action.payload.errorMessage,
      };
      case UPDATE_ADDRESS:
        console.log("Halo from profilereducer")
        return {
          ...state,
          updateAddressLoading: action.payload.loading,
          updateAddressResult: action.payload.data,
          updateAddressError: action.payload.errorMessage,
        };
    default:
      return state;
  }
}
