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
    const promises = [];
    const url = [];
    data.image.forEach(async img => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', `${img}`, true);
        xhr.send(null);
      });
      let fileName = img.split('/').pop();
      console.log('fileName', fileName);
      const ref = FIREBASE.storage()
        .ref(`Product Image/${data.uid}_${data.store}`)
        .child(fileName);

      const task = ref.put(blob, {contentType: 'image/jpeg'});
      promises.push(task);
      task.on(
        'state_changed',
        snapshot => {
          console.log(snapshot.totalBytes);
        },
        err => {
          console.log(err);
        },
        () => {
         task.snapshot.ref.getDownloadURL().then(downloadURL => {
           url.push(downloadURL);
           console.log('url:', url)
          });
        },
      );
    });
    console.log('asu', url)
    Promise.all(promises)
      .then(res => {
        console.log('res', res);
        const newData = {
          ...data,
          image: url,
        };
        console.log('data baru', newData);
        // FIREBASE.database()
        //   .ref('product')
        //   .push(newData)
        //   .then(response => {
        //     dispatchSuccess(
        //       dispatch,
        //       UPLOAD_PRODUCT,
        //       response ? response : [],
        //     );
        //   })
        //   .catch(error => {
        //     dispatchError(dispatch, UPLOAD_PRODUCT, error);
        //     showError(error);
        //   });
      })
      .catch(error => console.log(error));

    // });
  };
};
