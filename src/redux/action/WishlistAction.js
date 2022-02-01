import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  showSucces,
  storeData,
} from '../../utils';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const GET_WISHLIST_LIST = 'GET_WISHLIST_LIST';
export const GET_WISHLIST_BY_KEYWORD = 'GET_WISHLIST_BY_KEYWORD'
export const DELETE_WISHLIST_ITEM = 'DELETE_WISHLIST_ITEM';

export const addToWishlist = (data, id) => {
  return dispatch => {
    // Loading
    console.clear()
    console.log("action wish")
    dispatchLoading(dispatch, ADD_TO_WISHLIST);
    // Check previous user's wishlist item
    FIREBASE.database()
      .ref('wishlist/' + data.uid)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          console.clear();
          console.log('Cek bos', data);
          const product = data.product;
          FIREBASE.database()
            .ref('wishlist/' + data.uid)
            .child('productList')
            .child(id)
            .set(product)
            .then(response => {
              showSucces("Produk berhasil ditambahkan ke dalam daftar favorit!")
              dispatchSuccess(
                dispatch,
                ADD_TO_WISHLIST,
                response ? response : [],
              );
              // Clear Redux Data
                dispatchClear(dispatch, ADD_TO_WISHLIST);
            })
            .catch(error => {
              dispatchError(dispatch, ADD_TO_WISHLIST, error);
              showError(error);
            });
        } else {
          const wishlistDetails = {
            user: data.uid,
            date: new Date().toDateString(),
          };
          FIREBASE.database()
            .ref('wishlist')
            .child(data.uid)
            .set(wishlistDetails)
            .then(response => {
              const product = data.product;
              FIREBASE.database()
                .ref('wishlist/' + data.uid)
                .child('productList')
                .child(id)
                .set(product)
                .then(response => {
                  showSucces("Produk berhasil ditambahkan ke dalam daftar favorit!")
                  dispatchSuccess(
                    dispatch,
                    ADD_TO_WISHLIST,
                    response ? response : [],
                  );
                  // Clear Redux Data
                    dispatchClear(dispatch, ADD_TO_WISHLIST);
                })
                .catch(error => {
                  dispatchError(dispatch, ADD_TO_WISHLIST, error);
                  showError(error);
                });
            })
            .catch(error => {
              dispatchError(dispatch, ADD_TO_WISHLIST, error);
              showError(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_WISHLIST, error);
        showError(error);
      });
  };
};

export const getWishlist = (id) => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, GET_WISHLIST_LIST);
    FIREBASE.database()
      .ref('wishlist')
      .child(id)
      .once('value', querySnapshot => {
          //Result
          let data = querySnapshot.val();
        // Success
        dispatchSuccess(dispatch, GET_WISHLIST_LIST, data);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, GET_WISHLIST_LIST, error.message);
        showError(error.message);
      });
  };
};

export const getWishlistByKeyword = (id, keyword) => {
  console.log('keyword', keyword)
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, GET_WISHLIST_LIST);
    FIREBASE.database()
      .ref('wishlist/' + id)
      .child('productList')
      .orderByChild('name')
      .equalTo(keyword)
      .once('value', querySnapshot => {
          // console.log(`🚀 → file: WishlistAction.js → line 131 → getWishlistByKeyword → querySnapshot.val()`, querySnapshot.val())
        // Result
        // Success
        dispatchSuccess(dispatch, GET_WISHLIST_LIST, querySnapshot.val() ? {productList: querySnapshot.val()} : []);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, GET_WISHLIST_LIST, error.message);
        showError(error.message);
      });
  };
};

export const deleteWishlistItem = (data, id) => {
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, DELETE_WISHLIST_ITEM);
    FIREBASE.database()
    .ref('wishlist/' + data.uid)
    .child('productList')
    .once('value', querySnapshot => {
      //Result
      let item = Object.keys(querySnapshot.val()).length;
      console.log('Data cart', item);
      // Success
     if(item <= 1){
      FIREBASE.database()
      .ref('wishlist/' + data.uid)
      .remove()
      .then(response => {
        // Success
        dispatchSuccess(dispatch, DELETE_WISHLIST_ITEM, []);
        showSucces("Produk berhasil dihapus dari daftar favorit!")
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, DELETE_WISHLIST_ITEM, error.message);
        showError(error.message);
      });
     }
     else {
       console.log("else", data.uid);
      FIREBASE.database()
      .ref('wishlist')
      .child(data.uid)
      .child('productList')
      .child(id)
      .remove()
      .then(response => {
        // Success
        showSucces("Produk berhasil dihapus dari daftar favorit!")
        dispatchSuccess(dispatch, DELETE_WISHLIST_ITEM, []);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, DELETE_WISHLIST_ITEM, error.message);
        showError(error.message);
      });
     }
    })
    .catch(error => {
      //Error
      dispatchError(dispatch, DELETE_WISHLIST_ITEM, error.message);
      showError(error.message);
    });
  };
};
