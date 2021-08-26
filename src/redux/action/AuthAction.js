import FIREBASE from '../../config/FIREBASE';
import {dispatchClear, dispatchError, dispatchLoading, dispatchSuccess, showError, storeData} from '../../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = form => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, REGISTER_USER)
    //SignUp
    FIREBASE.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        const newData = {
          email: form.email,
          uid: success.user.uid,
        };
        //Save to RealtimeDatabase Firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(newData);
        //Success
        dispatchSuccess(dispatch, REGISTER_USER, newData)
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);
        //Clear Data from redux
        dispatchClear(dispatch, REGISTER_USER)
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, REGISTER_USER, error.message)
        showError(error.message);
      });
  };
};

export const loginUser = (email, password) => {
  console.log("halo from action");
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, LOGIN_USER)
    //Login
    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then(success => {
        console.log("Sukses login", success);
        FIREBASE.database()
          .ref('/users/' + success.user.uid)
          .once('value')
          .then(resDB => {
            //Success
            if (resDB.val()) {
              dispatchSuccess(dispatch, LOGIN_USER, resDB.val())
              //Save to localStorage(Asyncstorage)
              storeData('user', resDB.val());
              //Clear Data from redux
              dispatchClear(dispatch, LOGIN_USER)
            } else {
              //Error
              dispatchError(dispatch, LOGIN_USER, "User Data Not Found")
              showError("User Data Not Found");
            }
          });
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, LOGIN_USER, error.message)
        showError(error.message);
      });
  };
};
