import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';

export const GET_STORE_PRODUCT = 'GET_STORE_PRODUCT';
export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';

export const getStoreProduct = storeName => {
  console.log('halo toko action', storeName);
  return dispatch => {
    dispatchLoading(dispatch, GET_STORE_PRODUCT);

    FIREBASE.database()
      .ref('product')
      .orderByChild('store')
      .equalTo(storeName)
      .once('value', querySnapshot => {
        let data = querySnapshot.val();
        console.log('data', data);
        dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_STORE_PRODUCT, error);
        showError(error);
      });
  };
};

export const uploadProduct = data => {
  return dispatch => {
    dispatchLoading(dispatch, UPLOAD_PRODUCT);
    console.log('bentar deh', data.image[0]);
    var uploadTask = FIREBASE.storage().ref('hambuh').put(data.image[0]);

    uploadTask.on(
      'state_change',
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_PRODUCT, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('url', downloadURL);
          const newData = {
            ...data,
            image: downloadURL,
          };
          FIREBASE.database()
            .ref('product')
            .push(newData)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPLOAD_PRODUCT,
                response ? response : [],
              );
            })
            .catch(error => {
              dispatchError(dispatch, UPLOAD_PRODUCT, error);
              showError(error);
            });
        });
      },
    );
  };
};
