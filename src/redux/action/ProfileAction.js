import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  storeData,
} from '../../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export const updateProfile = data => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, UPDATE_PROFILE);

    const newData = {
      uid: data.uid,
      avatar: data.avatar ? data.avatar : '',
      balance: 0,
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      number: data.number,
    };
    console.log('newData', newData);

    FIREBASE.database()
      .ref('users/' + newData.uid)
      .update(newData)
      .then(response => {
        console.log('send to firebase');
        //Success
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : []);
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);

        //Clear Data from redux
        dispatchClear(dispatch, UPDATE_PROFILE);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, UPDATE_PROFILE, error.message);
        showError(error.message);
      });
  };
};

export const updateAddress = (address, data) => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, UPDATE_ADDRESS);

    const newData = {
      ...data,
      address: address,
    };

    FIREBASE.database()
      .ref('users/' + data.uid)
      .update(newData)
      .then(response => {
        //Success
        dispatchSuccess(dispatch, UPDATE_ADDRESS, response ? response : []);
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);

        //Clear Data from redux
        dispatchClear(dispatch, UPDATE_ADDRESS);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, UPDATE_ADDRESS, error.message);
        showError(error.message);
      });
  };
};
