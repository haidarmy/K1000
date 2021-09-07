import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';

export const GET_CATEGORY = 'GET_CATEGORY';

export const getCategory = () => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, GET_CATEGORY);
    FIREBASE.database()
            .ref('categories')
            .once('value', (querySnapshot) => {
                //Result
                let data = querySnapshot.val()

                // Success
                dispatchSuccess(dispatch, GET_CATEGORY, data)
            })
            .catch((error) => {
                //Error
                dispatchError(dispatch, GET_CATEGORY, error.message)
                showError(error.message)
            })
  };
};
