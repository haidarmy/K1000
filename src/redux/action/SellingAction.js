import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';

export const GET_LIST_SALE = 'GET_LIST_SALE';
export const UPDATE_STATUS_SALE = 'UPDATE_STATUS_SALE';

export const getListSale = uid => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_SALE);

    FIREBASE.database()
      .ref('orders')
      .orderByChild(`orderDetails/${uid}/store/storeId`)
      .equalTo(uid)
      .once('value', querySnapshot => {
        let dataSorted = [];
        querySnapshot.forEach(e => {
          dataSorted.unshift({...e.val()});
        });
        dispatchSuccess(dispatch, GET_LIST_SALE, dataSorted);
      })
      .catch(error => {
        console.log(error);
        dispatchError(dispatch, GET_LIST_SALE, error);
        showError(error);
      });
  };
};

export const updateStatusSale = (
  // orderId = 'K1000-1635669525808-AkrMPrVhlmZxGNYzfFHVbOMIgsj1',
  // storeId = 'AkrMPrVhlmZxGNYzfFHVbOMIgsj1',
  resi,
  shipping,
) => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_STATUS_SALE);
    FIREBASE.database()
      .ref('orders/' + orderId)
      .child('orderDetails/' + storeId)
      // .orderByChild('status')
      .update({status: 'shipped', shipping: {...shipping, resi: `${resi}`}})
      .then(response => {
        dispatchSuccess(dispatch, UPDATE_STATUS_SALE, response ? response : []);
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_STATUS_SALE, error);
        showError(error);
      });
  };
};
