import {
  GET_USER_SALES_REPORT,
  UPDATE_PRODUCT_CANCEL_COUNT,
  UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
  UPDATE_PRODUCT_VIEW_COUNT,
} from '../../action/SalesReportAction';

const initialState = {
  getUserSalesReportLoading: false,
  getUserSalesReportResult: false,
  getUserSalesReportError: false,

  updateProductViewCountLoading: false,
  updateProductViewCountResult: false,
  updateProductViewCountError: false,

  updateProductCancelCountLoading: false,
  updateProductCancelCountResult: false,
  updateProductCancelCountError: false,

  updateProductSoldCountLoading: false,
  updateProductSoldCountResult: false,
  updateProductSoldCountError: false,

  updateProductCategoryCountLoading: false,
  updateProductCategoryCountResult: false,
  updateProductCategoryCountError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_SALES_REPORT:
      return {
        ...state,
        getUserSalesReportLoading: action.payload.loading,
        getUserSalesReportResult: action.payload.data,
        getUserSalesReportError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_VIEW_COUNT:
      return {
        ...state,
        updateProductViewCountLoading: action.payload.loading,
        updateProductViewCountResult: action.payload.data,
        updateProductViewCountError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_CANCEL_COUNT:
      return {
        ...state,
        updateProductCancelCountLoading: action.payload.loading,
        updateProductCancelCountResult: action.payload.data,
        updateProductCancelCountError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT:
      return {
        ...state,
        updateProductSoldRevenueCategoryCountLoading: action.payload.loading,
        updateProductSoldRevenueCategoryCountResult: action.payload.data,
        updateProductSoldRevenueCategoryCountError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
