import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_STORE_PRODUCT,
  UPLOAD_PRODUCT,
} from '../../action/StoreAction';

const initialState = {
  getStoreProductLoading: false,
  getStoreProductResult: false,
  getStoreProductError: false,

  uploadStoreProductLoading: false,
  uploadStoreProductResult: false,
  uploadStoreProductError: false,

  editStoreProductLoading: false,
  editStoreProductResult: false,
  editStoreProductError: false,

  deleteStoreProductLoading: false,
  deleteStoreProductResult: false,
  deleteStoreProductError: false,
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
    case UPLOAD_PRODUCT:
      return {
        ...state,
        uploadStoreProductLoading: action.payload.loading,
        uploadStoreProductResult: action.payload.data,
        uploadStoreProductError: action.payload.errorMessage,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        editStoreProductLoading: action.payload.loading,
        editStoreProductResult: action.payload.data,
        editStoreProductError: action.payload.errorMessage,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteStoreProductLoading: action.payload.loading,
        deleteStoreProductResult: action.payload.data,
        deleteStoreProductError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
