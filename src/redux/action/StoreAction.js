import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  showSucces,
} from '../../utils';

export const GET_STORE_PRODUCT = 'GET_STORE_PRODUCT';
export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

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
    const url = [];
    const pushImage = () => {
      return new Promise((resolve, reject) => {
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
          if (blob) {
            let fileName = img.split('/').pop();
            console.log('fileName', fileName);
            const ref = FIREBASE.storage()
              .ref(`Product Image/${data.uid}_${data.store}`)
              .child(fileName);

            const task = ref.put(blob, {contentType: 'image/jpeg'});
            task.on(
              'state_changed',
              snapshot => {
                console.log(snapshot.totalBytes);
              },
              err => {
                dispatchError(dispatch, UPLOAD_PRODUCT, err);
                showError(err);
                reject(err);
              },
              () => {
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                  url.unshift(downloadURL);
                  console.log('url:', url);
                  if (url.length == data.image.length) {
                    resolve();
                  }
                });
              },
            );
          } else {
            dispatchError(dispatch, UPLOAD_PRODUCT, 'Gagal mengupload gambar!');
            showError('Gagal mengupload gambar!');
          }
        });
      });
    };

    const pushData = () => {
      const newData = {
        ...data,
        image: url,
      };
      console.log('data baru', newData);
      FIREBASE.database()
        .ref('product')
        .push(newData)
        .then(response => {
          dispatchSuccess(dispatch, UPLOAD_PRODUCT, response ? response : []);
          dispatchClear(dispatch, UPLOAD_PRODUCT);
        })
        .catch(error => {
          dispatchError(dispatch, UPLOAD_PRODUCT, error);
          showError(error);
        });
    };

    const uploadData = async () => {
      await pushImage();
      pushData();
    };
    uploadData();
  };
};

export const editProduct = (data, newImage, deleteImage, oldImage, id) => {
  return dispatch => {
    dispatchLoading(dispatch, EDIT_PRODUCT);
    const url = [];
    const pushImage = () => {
      return new Promise((resolve, reject) => {
        newImage.forEach(async img => {
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
          if (blob) {
            let fileName = img.split('/').pop();
            console.log('fileName', fileName);
            const ref = FIREBASE.storage()
              .ref(`Product Image/${data.uid}_${data.store}`)
              .child(fileName);

            const task = ref.put(blob, {contentType: 'image/jpeg'});
            task.on(
              'state_changed',
              snapshot => {
                console.log(snapshot.totalBytes);
              },
              err => {
                dispatchError(dispatch, EDIT_PRODUCT, err);
                showError(err);
                reject(err);
              },
              () => {
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                  url.unshift(downloadURL);
                  console.log('url:', url);
                  if (url.length == newImage.length) {
                    resolve();
                  }
                });
              },
            );
          } else {
            dispatchError(dispatch, EDIT_PRODUCT, 'Gagal mengupload gambar!');
            showError('Gagal mengupload gambar!');
          }
        });
      });
    };

    const popImage = () => {
      return new Promise((resolve, reject) => {
        deleteImage.forEach(img => {
          // Create a reference to the file to delete
          var desertRef = FIREBASE.storage().refFromURL(img);

          // Delete the file
          desertRef
            .delete()
            .then(() => {
              resolve();
            })
            .catch(error => {
              dispatchError(dispatch, EDIT_PRODUCT, err);
              showError(err);
              reject(error);
            });
        });
      });
    };

    const pushData = () => {
      const newData = {
        ...data,
        image: [...url, ...oldImage],
      };
      console.log('data baru', newData);
      FIREBASE.database()
        .ref('product/' + id)
        .update(newData)
        .then(response => {
          dispatchSuccess(dispatch, EDIT_PRODUCT, response ? response : []);
          dispatchClear(dispatch, EDIT_PRODUCT);
        })
        .catch(error => {
          dispatchError(dispatch, EDIT_PRODUCT, error);
          showError(error);
        });
    };

    const uploadData = async () => {
      const image = async () => {
        if (newImage.length >= 1) {
          await pushImage();
        }
        if (deleteImage.length >= 1) {
          await popImage();
        }
      };
      await image();
      pushData();
    };
    uploadData();
  };
};

export const deleteProduct = (images, id, store) => {
  return dispatch => {
    dispatchLoading(dispatch, DELETE_PRODUCT);

    const popImage = () => {
      return new Promise((resolve, reject) => {
        images.forEach(img => {
          // Create a reference to the file to delete
          var desertRef = FIREBASE.storage().refFromURL(img);

          // Delete the file
          desertRef
            .delete()
            .then(() => {
              resolve();
            })
            .catch(error => {
              dispatchError(dispatch, DELETE_PRODUCT, err);
              showError(err);
              reject(error);
            });
        });
      });
    };
    const popData = () => {
      FIREBASE.database()
        .ref('product/' + id)
        .remove()
        .then(response => {
          dispatchSuccess(
            dispatch,
            DELETE_PRODUCT,
            'Product berhasil dihapus!',
          );
          dispatchClear(dispatch, DELETE_PRODUCT);
          dispatch(getStoreProduct(store))
          showSucces('Product berhasil dihapus!')
        })
        .catch(error => {
          dispatchError(dispatch, DELETE_PRODUCT, error);
          showError(error);
        });
    };
    const popProduct = async () => {
      await popImage()
      popData()
    }
    popProduct()
  };
};
