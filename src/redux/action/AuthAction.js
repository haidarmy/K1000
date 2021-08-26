import FIREBASE from '../../config/FIREBASE';
import {showError, storeData} from '../../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = form => {
  return dispatch => {
    //Loading
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //SignUp
    FIREBASE.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        const newData = {
          email: form.email,
          uid: success.user.uid,
        };
        console.log('New Data', newData);
        //Save to RealtimeDatabase Firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(newData);
        //Success
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: newData,
            errorMessage: false,
          },
        });
        //Save to localStorage(Asyncstorage)
        storeData('user', newData);
        //Clear Data from redux
        dispatch({
          type: REGISTER_USER,
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
          type: REGISTER_USER,
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

export const loginUser = (email, password) => {
  console.log("halo from action");
  return dispatch => {
    //Loading
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
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
            console.log("sukses cek login", resDB);
            if (resDB.val()) {
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: resDB.val(),
                  errorMessage: false,
                },
              });
              //Save to localStorage(Asyncstorage)
              storeData('user', resDB.val());
              //Clear Data from redux
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: false,
                  errorMessage: false,
                },
              });
            } else {
              //Error
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: false,
                  errorMessage: "User Data Not Found",
                },
              });
              showError("User Data Not Found");
            }
          });
      })
      .catch(error => {
        //Error
        dispatch({
          type: LOGIN_USER,
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
