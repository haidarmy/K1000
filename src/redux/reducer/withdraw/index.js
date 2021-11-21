import {
  ADD_USER_BANK_ACCOUNT,
  GET_USER_BANK_ACCOUNT,
  ADD_REQUEST_WITHDRAW,
} from '../../action/WithdrawAction';

const initialState = {
  addBankAccountLoading: false,
  addBankAccountResult: false,
  addBankAccountError: false,

  getBankAccountLoading: false,
  getBankAccountResult: false,
  getBankAccountError: false,

  addRequestWithdrawLoading: false,
  addRequestWithdrawResult: false,
  addRequestWithdrawError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER_BANK_ACCOUNT:
      return {
        ...state,
        addBankAccountLoading: action.payload.loading,
        addBankAccountResult: action.payload.data,
        addBankAccountError: action.payload.errorMessage,
      };
    case GET_USER_BANK_ACCOUNT:
      return {
        ...state,
        getBankAccountLoading: action.payload.loading,
        getBankAccountResult: action.payload.data,
        getBankAccountError: action.payload.errorMessage,
      };
    case ADD_REQUEST_WITHDRAW:
      return {
        ...state,
        addRequestWithdrawLoading: action.payload.loading,
        addRequestWithdrawResult: action.payload.data,
        addRequestWithdrawError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
