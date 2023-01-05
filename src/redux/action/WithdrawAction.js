import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  getData,
  showError,
  storeData,
} from '../../utils';

export const ADD_USER_BANK_ACCOUNT = 'ADD_USER_BANK_ACCOUNT';
export const GET_USER_BANK_ACCOUNT = 'GET_USER_BANK_ACCOUNT';
export const ADD_REQUEST_WITHDRAW = 'ADD_REQUEST_WITHDRAW';

export const addUserBankAccount = data => {
  return dispatch => {
    dispatchLoading(dispatch, ADD_USER_BANK_ACCOUNT);

    FIREBASE.database()
      .ref('bankAccount')
      .child(data.uid)
      .push(data)
      .then(response => {
        dispatchSuccess(
          dispatch,
          ADD_USER_BANK_ACCOUNT,
          response ? response : [],
        );
        dispatchClear(dispatch, ADD_USER_BANK_ACCOUNT);
      })
      .catch(error => {
        dispatchError(dispatch, ADD_USER_BANK_ACCOUNT, error.message);
        showError(error);
      });
  };
};

export const getUserBankAccount = uid => {
  return dispatch => {
    dispatchLoading(dispatch, GET_USER_BANK_ACCOUNT);

    FIREBASE.database()
      .ref('bankAccount')
      .child(uid)
      .orderByChild('date')
      .once('value', querySnapshot => {
        // if (querySnapshot.val()) {
          let dataSorted = [];
          querySnapshot.forEach(e => {
            dataSorted.unshift({...e.val()});
          });
          dispatchSuccess(dispatch, GET_USER_BANK_ACCOUNT, dataSorted);
        // }
      })
      .catch(error => {
        dispatchError(dispatch, GET_USER_BANK_ACCOUNT, error.message);
        showError(error.message);
      });
  };
};

export const addRequestWithdraw = (id, data, remainingBalance) => {
  return dispatch => {
    dispatchLoading(dispatch, ADD_REQUEST_WITHDRAW);

    Promise.all([
      FIREBASE.database().ref('withdraw').child(id).set(data),
      FIREBASE.database().ref('users').child(data.uid).update({balance: remainingBalance}),
      FIREBASE.database()
        .ref('bankAccount')
        .child(data.uid)
        .orderByChild('date')
        .equalTo(data.date)
        .once('value', querySnapshot => {
          if (querySnapshot.val()) {
            FIREBASE.database()
              .ref(
                `bankAccount/${data.uid}/${
                  Object.keys(querySnapshot.val())[0]
                }`,
              )
              .update({date: Date.now()})
              .catch(error => {
                dispatchError(dispatch, ADD_REQUEST_WITHDRAW, error.message);
                showError(error.message);
              });
          }
        }),
    ])
      .then(response => {
        getData('user').then(res => {
          storeData('user', {...res, balance: remainingBalance})
        })
        dispatchSuccess(
          dispatch,
          ADD_REQUEST_WITHDRAW,
          response ? response : [],
        );
        dispatchClear(dispatch, ADD_REQUEST_WITHDRAW)
      })
      .catch(error => {
        dispatchError(dispatch, ADD_REQUEST_WITHDRAW, error.message);
        showError(error.message);
      });
  };
};
