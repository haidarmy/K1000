import { GET_CATEGORY } from "../../action/CategoryAction";

const initialState = {
  getCategoryLoading: false,
  getCategoryResult: false,
  getCategoryError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        getCategoryLoading: action.payload.loading,
        getCategoryResult: action.payload.data,
        getCategoryError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
