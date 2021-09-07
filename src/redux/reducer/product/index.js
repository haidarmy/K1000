import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_KEYWORD,
  DELETE_PARAMETER_PRODUCT,
  GET_PRODUCT_BY_SORT,
  GET_PRODUCT_BY_RANGE,
} from '../../action/ProductAction';

const initialState = {
  getListProductLoading: false,
  getListProductResult: false,
  getListProductError: false,
  idCategory: false,
  nameCategory: false,
  keyword: false,
  idSort: false,
  rangeMaximum: false,
  rangeMinimum: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PRODUCT:
      return {
        ...state,
        getListProductLoading: action.payload.loading,
        getListProductResult: action.payload.data,
        getListProductError: action.payload.errorMessage,
      };

    case GET_PRODUCT_BY_CATEGORY:
      console.log('Reducer Kategori', action.payload.idCategory);
      return {
        ...state,
        idCategory: action.payload.idCategory,
        nameCategory: action.payload.nameCategory,
      };

    case GET_PRODUCT_BY_KEYWORD:
      return {
        ...state,
        keyword: action.payload.data,
      };

    case GET_PRODUCT_BY_SORT:
      return {
        ...state,
        idSort: action.payload.idSort,
      };

    case GET_PRODUCT_BY_RANGE:
      console.log("Reducer Range", action.payload.rangeMaximum + ' ' + action.payload.rangeMinimum);
      return {
        ...state,
        rangeMaximum: action.payload.rangeMaximum,
        rangeMinimum: action.payload.rangeMinimum,
      };

    case DELETE_PARAMETER_PRODUCT:
      return {
        ...state,
        idCategory: false,
        nameCategory: false,
        keyword: false,
      };

    default:
      return state;
  }
}
