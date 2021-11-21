import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';

export const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';
export const GET_PRODUCT_BY_CATEGORY = 'GET_PRODUCT_BY_CATEGORY';
export const GET_PRODUCT_BY_KEYWORD = 'GET_PRODUCT_BY_KEYWORD';
export const GET_PRODUCT_BY_SORT = 'GET_PRODUCT_BY_SORT';
export const GET_PRODUCT_BY_RANGE = 'GET_PRODUCT_BY_RANGE';
export const DELETE_PARAMETER_PRODUCT = 'DELETE_PARAMETER_PRODUCT';

export const getListProduct = (
  idCategory,
  keyword,
  idSort,
  rangeMaximum,
  rangeMinimum,
) => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, GET_LIST_PRODUCT);
    if (idCategory) {
      FIREBASE.database()
        .ref('product')
        .orderByChild('category')
        .equalTo(idCategory)
        .once('value', querySnapshot => {
          //Result
          let data = querySnapshot.val();
          // console.log("DATA FIREBASE", data);
          // Success
          dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_LIST_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
          dispatchSuccess(dispatch, GET_LIST_PRODUCT, querySnapshot.val() ? querySnapshot.val() : []);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_LIST_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);
            } else {
              let data = querySnapshot.val();
              // Success
              dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
            }

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
            dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
            dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
            dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);

            //Clear Redux Data
            // dispatchClear(dispatch, GET_LIST_PRODUCT)
          })
          .catch(error => {
            //Error
            dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
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
          dispatchSuccess(dispatch, GET_LIST_PRODUCT, dataSorted);

          //Clear Redux Data
          // dispatchClear(dispatch, GET_LIST_PRODUCT)
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, GET_LIST_PRODUCT, error.message);
          showError(error.message);
        });
    }
  };
};

export const getProductByCategory = (idCategory, namecategory) => ({
  type: GET_PRODUCT_BY_CATEGORY,
  payload: {
    idCategory: idCategory,
    nameCategory: namecategory,
  },
});

export const getProductByKeyword = keyword => ({
  type: GET_PRODUCT_BY_KEYWORD,
  payload: {
    data: keyword,
  },
});

export const getProductBySort = idSort => ({
  type: GET_PRODUCT_BY_SORT,
  payload: {
    idSort: idSort,
  },
});

export const getProductByRange = (maximum, minimum) => ({
  type: GET_PRODUCT_BY_RANGE,
  payload: {
    rangeMaximum: maximum,
    rangeMinimum: minimum,
  },
});

export const deleteParamaterProduct = () => ({
  type: DELETE_PARAMETER_PRODUCT,
});
