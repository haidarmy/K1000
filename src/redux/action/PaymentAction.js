import axios from 'axios';
import {
  API_TIMEOUT,
  URL_MIDTRANS,
  HEADER_MIDTRANS,
  showError,
} from '../../utils';
import {
  dispatchLoading,
  dispatchError,
  dispatchSuccess,
  dispatchClear,
} from '../../utils';

export const SNAP_TRANSACTIONS = 'SNAP_TRANSACTIONS';

export const snapTransactions = data => {
  return dispatch => {
    dispatchLoading(dispatch, SNAP_TRANSACTIONS);

    axios({
      method: 'POST',
      url: URL_MIDTRANS + 'transactions',
      headers: HEADER_MIDTRANS,
      data: data,
      timeout: API_TIMEOUT,
    })
      .then(response => {
        dispatchSuccess(
          dispatch,
          SNAP_TRANSACTIONS,
          response.data ? response.data : [],
        );
        dispatchClear(dispatch, SNAP_TRANSACTIONS)
      })
      .catch(error => {
        dispatchError(dispatch, SNAP_TRANSACTIONS, error);
        showError(error);
      });
  };
};
