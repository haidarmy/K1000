import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  storeData,
} from '../../utils';

export const USER_INFO = 'USER_INFO';

export const getUserInfo = uid => {
  return dispatch => {
    dispatchLoading(dispatch, USER_INFO);
    FIREBASE.database()
      .ref('users/' + uid)
      .once('value')
      .then(resDB => {
        if (resDB.val()) {
          console.log('res DB', resDB.val())
          dispatchSuccess(dispatch, USER_INFO, resDB.val());
          storeData('user', resDB.val());
        } 
        // else {
        //   dispatchError(dispatch, USER_INFO, 'User Data Not Found');
        //   showError('User Data Not Found');
        // }
      });
  };
};
