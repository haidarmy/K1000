import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  showSucces,
} from '../../utils';

// export const GET_STORE_PRODUCT = 'GET_STORE_PRODUCT';
export const GET_STORE_PRODUCT = 'GET_STORE_PRODUCT';
export const GET_STORE_PRODUCT_BY_CATEGORY = 'GET_STORE_PRODUCT_BY_CATEGORY';
export const GET_STORE_PRODUCT_BY_KEYWORD = 'GET_STORE_PRODUCT_BY_KEYWORD';
export const GET_STORE_PRODUCT_BY_SORT = 'GET_STORE_PRODUCT_BY_SORT';
export const GET_STORE_PRODUCT_BY_RANGE = 'GET_STORE_PRODUCT_BY_RANGE';
export const DELETE_PARAMETER_STORE_PRODUCT = 'DELETE_PARAMETER_STORE_PRODUCT';

export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

// export const getStoreProduct = storeName => {
//   console.log('halo toko action', storeName);
//   return dispatch => {
//     dispatchLoading(dispatch, GET_STORE_PRODUCT);

//     FIREBASE.database()
//       .ref('product')
//       .orderByChild('store')
//       .equalTo(storeName)
//       .once('value', querySnapshot => {
//         let data = querySnapshot.val();
//         console.log('data', data);
//         dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);
//       })
//       .catch(error => {
//         dispatchError(dispatch, GET_STORE_PRODUCT, error);
//         showError(error);
//       });
//   };
// };

export const getStoreProduct = (
  idCategory,
  keyword,
  idSort,
  rangeMaximum,
  rangeMinimum,
) => {
  console.log(`🚀 → file: StoreAction.js → line 55 → idCategory`, idCategory)
  return dispatch => {

    //Loading
    dispatchLoading(dispatch, GET_STORE_PRODUCT);
    if (idCategory) {
      console.log(`🚀 → file: StoreAction.js → line 55 → idCategory`, idCategory)
      FIREBASE.database()
        .ref('product')
        .orderByChild('category')
        .equalTo(idCategory)
        .once('value', querySnapshot => {
          //Result
          let data = querySnapshot.val();
          // console.log("DATA FIREBASE", data);
          // Success
          dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_STORE_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
          showError(error.message);
        });
    } else if (keyword) {
      FIREBASE.database()
        .ref('product')
        .orderByChild('name')
        .equalTo(keyword)
        .once('value', querySnapshot => {
          //Result
          // console.log("DATA FIREBASE", data);
          // Success
          dispatchSuccess(dispatch, GET_STORE_PRODUCT, querySnapshot.val() ? querySnapshot.val() : []);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_STORE_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
          showError(error.message);
        });
    } else if (rangeMaximum || rangeMinimum) {
      if (rangeMaximum && rangeMinimum) {
        FIREBASE.database()
          .ref('product')
          .orderByChild('price')
          .startAt(parseInt(rangeMinimum))
          .endAt(parseInt(rangeMaximum))
          .once('value', querySnapshot => {
            //Result
            if (idSort) {
              let dataSorted = [];
              querySnapshot.forEach(e => {
                if (idSort === 'Termahal') {
                  dataSorted.unshift({...e.val()});
                } else if (idSort === 'Termurah') {
                  dataSorted.push({...e.val()});
                }
              });
              //Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      } else if (rangeMaximum) {
        FIREBASE.database()
          .ref('product')
          .orderByChild('price')
          .endAt(parseInt(rangeMaximum))
          .once('value', querySnapshot => {
            //Result
            if (idSort) {
              let dataSorted = [];
              querySnapshot.forEach(e => {
                if (idSort === 'Termahal') {
                  dataSorted.unshift({...e.val()});
                } else if (idSort === 'Termurah') {
                  dataSorted.push({...e.val()});
                }
              });
              //Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      } else if (rangeMinimum) {
        FIREBASE.database()
          .ref('product')
          .orderByChild('price')
          .startAt(parseInt(rangeMinimum))
          .once('value', querySnapshot => {
            //Result
            if (idSort) {
              let dataSorted = [];
              querySnapshot.forEach(e => {
                if (idSort === 'Termahal') {
                  dataSorted.unshift({...e.val()});
                } else if (idSort === 'Termurah') {
                  dataSorted.push({...e.val()});
                }
              });
              //Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_STORE_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      }
    } else if (idSort) {
      console.log('HALOOO !');
      if (idSort === 'Termahal' || idSort === 'Termurah') {
        FIREBASE.database()
          .ref('product')
          .orderByChild('price')
          // .limitToFirst(3)
          .once('value', querySnapshot => {
            //Result
            let dataSorted = [];
            querySnapshot.forEach(e => {
              if (idSort === 'Termahal') {
                dataSorted.unshift({...e.val()});
              } else if (idSort === 'Termurah') {
                dataSorted.push({...e.val()});
              }
            });
            //Success
            dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      } else if (idSort === 'Terbaru') {
        FIREBASE.database()
          .ref('product')
          .orderByChild('date')
          // .limitToFirst(3)
          .once('value', querySnapshot => {
            //Result
            let dataSorted = [];
            querySnapshot.forEach(e => {
              if (idSort === 'Terbaru') {
                dataSorted.push({...e.val()});
              }
            });
            //Success
            dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      } else if (idSort === 'Terlaris') {
        FIREBASE.database()
          .ref('product')
          .orderByChild('sold')
          // .limitToFirst(3)
          .once('value', querySnapshot => {
            //Result
            let dataSorted = [];
            querySnapshot.forEach(e => {
              if (idSort === 'Terlaris') {
                dataSorted.unshift({...e.val()});
              }
            });
            //Success
            dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_STORE_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
            showError(error.message);
          });
      }
    } else {
      FIREBASE.database()
        .ref('product')
        .orderByChild('stock')
        .once('value', querySnapshot => {
          //Result
          let dataSorted = [];
          querySnapshot.forEach(e => {
            dataSorted.unshift({...e.val()});
          });
          // Success
          dispatchSuccess(dispatch, GET_STORE_PRODUCT, dataSorted);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_STORE_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_STORE_PRODUCT, error.message);
          showError(error.message);
        });
    }
  };
};

export const getStoreProductByCategory = (idCategory, namecategory) => ({
  type: GET_STORE_PRODUCT_BY_CATEGORY,
  payload: {
    idCategory: idCategory,
    nameCategory: namecategory,
  },
});

export const getStoreProductByKeyword = keyword => ({
  type: GET_STORE_PRODUCT_BY_KEYWORD,
  payload: {
    data: keyword,
  },
});

export const getStoreProductBySort = idSort => ({
  type: GET_STORE_PRODUCT_BY_SORT,
  payload: {
    idSort: idSort,
  },
});

export const getStoreProductByRange = (maximum, minimum) => ({
  type: GET_STORE_PRODUCT_BY_RANGE,
  payload: {
    rangeMaximum: maximum,
    rangeMinimum: minimum,
  },
});

export const deleteParameterStoreProduct = () => ({
  type: DELETE_PARAMETER_STORE_PRODUCT,
});


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
              error => {
                dispatchError(dispatch, UPLOAD_PRODUCT, error);
                showError(error);
                reject(error);
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
              error=> {
                dispatchError(dispatch, EDIT_PRODUCT, error);
                showError(error);
                reject(error);
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
              dispatchError(dispatch, EDIT_PRODUCT, error);
              showError(error);
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
              dispatchError(dispatch, DELETE_PRODUCT, error);
              showError(error);
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
