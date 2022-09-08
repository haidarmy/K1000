import {
  GET_USER_EXPENDITURE_REPORT,
  UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
  UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
  UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
} from '../../action/ExpenditureReportAction';

const initialState = {
  getUserExpenditureReportLoading: false,
  getUserExpenditureReportResult: false,
  getUserExpenditureReportError: false,

  updateProductViewCountExpenditureLoading: false,
  updateProductViewCountExpenditureResult: false,
  updateProductViewCountExpenditureError: false,

  updateProductCancelCountExpenditureLoading: false,
  updateProductCancelCountExpenditureResult: false,
  updateProductCancelCountExpenditureError: false,

  updateProductSoldCountExpenditureLoading: false,
  updateProductSoldCountExpenditureResult: false,
  updateProductSoldCountExpenditureError: false,

  updateProductCategoryCountExpenditureLoading: false,
  updateProductCategoryCountExpenditureResult: false,
  updateProductCategoryCountExpenditureError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_EXPENDITURE_REPORT:
      return {
        ...state,
        getUserExpenditureReportLoading: action.payload.loading,
        getUserExpenditureReportResult: action.payload.data,
        getUserExpenditureReportError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE:
      return {
        ...state,
        updateProductViewCountExpenditureLoading: action.payload.loading,
        updateProductViewCountExpenditureResult: action.payload.data,
        updateProductViewCountExpenditureError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE:
      return {
        ...state,
        updateProductCancelCountExpenditureLoading: action.payload.loading,
        updateProductCancelCountExpenditureResult: action.payload.data,
        updateProductCancelCountExpenditureError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE:
      return {
        ...state,
        updateProductSoldRevenueCategoryCountExpenditureLoading:
          action.payload.loading,
        updateProductSoldRevenueCategoryCountExpenditureResult:
          action.payload.data,
        updateProductSoldRevenueCategoryCountExpenditureError:
          action.payload.errorMessage,
      };
    default:
      return state;
  }
}
