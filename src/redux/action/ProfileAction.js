import FIREBASE from '../../config/FIREBASE';
import {showError, storeData} from '../../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

export const updateProfile = data => {
  return dispatch => {
    //Loading
    console.log("Hai Action Profile")
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const newData = {
      uid: data.uid,
      avatar: data.avatar ? data.avatar : '',
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      number: data.number,
    };
    console.log('newData', newData)

    FIREBASE.database()
      .ref('users/' + newData.uid)
      .update(newData)
      .then(response => {
          console.log("send to firebase");
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            loading: false,
            data: response ? response : [],
            errorMessage: false,
          },
        });
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);

         //Clear Data from redux
         dispatch({
          type: UPDATE_PROFILE,
          payload: {
            loading: false,
            data: false,
            errorMessage: false,
          },
        });
      })
      .catch(error => {
        //Error
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        showError(error.message);
      });
  };
};

export const updateAddress = (address, data) => {
  return dispatch => {
    //Loading
    console.log("Hai Action Address")
    dispatch({
      type: UPDATE_ADDRESS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    console.log(`Address: ${address} - data ${data}`)

    const newData = {
      ...data,
      address: address
    }

    FIREBASE.database()
      .ref('users/' + data.uid)
      .update(newData)
      .then(response => {
          console.log("send to firebase");
        dispatch({
          type: UPDATE_ADDRESS,
          payload: {
            loading: false,
            data: response ? response : [],
            errorMessage: false,
          },
        });
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);

         //Clear Data from redux
         dispatch({
          type: UPDATE_ADDRESS,
          payload: {
            loading: false,
            data: false,
            errorMessage: false,
          },
        });
      })
      .catch(error => {
        //Error
        dispatch({
          type: UPDATE_ADDRESS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        showError(error.message);
      });
  };
};
