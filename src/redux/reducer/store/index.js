import {
  DELETE_PARAMETER_STORE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_STORE_PRODUCT,
  GET_STORE_PRODUCT_BY_CATEGORY,
  GET_STORE_PRODUCT_BY_KEYWORD,
  GET_STORE_PRODUCT_BY_RANGE,
  GET_STORE_PRODUCT_BY_SORT,
  UPLOAD_PRODUCT,
} from '../../action/StoreAction';

const initialState = {
  getStoreProductLoading: false,
  getStoreProductResult: false,
  getStoreProductError: false,

  idCategory: false,
  nameCategory: false,
  keyword: false,
  idSort: false,
  rangeMaximum: false,
  rangeMinimum: false,

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
      case GET_STORE_PRODUCT_BY_CATEGORY:
        return {
          ...state,
          idCategory: action.payload.idCategory,
          nameCategory: action.payload.nameCategory,
        };
  
      case GET_STORE_PRODUCT_BY_KEYWORD:
        return {
          ...state,
          keyword: action.payload.data,
        };
  
      case GET_STORE_PRODUCT_BY_SORT:
        return {
          ...state,
          idSort: action.payload.idSort,
        };
  
      case GET_STORE_PRODUCT_BY_RANGE:
        return {
          ...state,
          rangeMaximum: action.payload.rangeMaximum,
          rangeMinimum: action.payload.rangeMinimum,
        };
  
      case DELETE_PARAMETER_STORE_PRODUCT:
        return {
          ...state,
          idCategory: false,
          idSort: false,
          rangeMaximum: false,
          rangeMinimum: false,
          nameCategory: false,
          keyword: false,
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
