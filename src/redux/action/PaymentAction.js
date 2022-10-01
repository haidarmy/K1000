import axios from 'axios';
import {
  API_TIMEOUT,
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';
import Config from 'react-native-config';

export const SNAP_TRANSACTIONS = 'SNAP_TRANSACTIONS';

export const snapTransactions = data => {
  return dispatch => {
    dispatchLoading(dispatch, SNAP_TRANSACTIONS);

    axios({
      method: 'POST',
      url: Config.MIDTRANS_API + 'transactions',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Config.MIDTRANS_API_KEY,
      },
      data: data,
      timeout: API_TIMEOUT,
    })
      .then(response => {
        dispatchSuccess(
          dispatch,
          SNAP_TRANSACTIONS,
          response.data ? response.data : [],
        );
        dispatchClear(dispatch, SNAP_TRANSACTIONS);
      })
      .catch(error => {
        dispatchError(dispatch, SNAP_TRANSACTIONS, error.message);
        showError(error.message);
      });
  };
};
