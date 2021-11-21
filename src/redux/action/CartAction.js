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

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_LIST = 'GET_CART_LIST';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const addToCart = data => {
  return dispatch => {
    // Loading
    dispatchLoading(dispatch, ADD_TO_CART);

    // Check previous user's cart item
    FIREBASE.database()
      .ref('cart/' + data.uid)
      .once('value', querySnapshot => {
        console.log('mumet lor', querySnapshot.val());
        if (querySnapshot.val()) {
          console.log('Cart udah ada', querySnapshot.val());
          const mainCart = querySnapshot.val();
          const newTotalPrice = parseInt(data.amount * data.product.price);
          const newTotalWeight = parseInt(data.amount * data.product.weight);

          FIREBASE.database()
            .ref('cart')
            .child(data.uid)
            .update({
              totalPrice: mainCart.totalPrice + newTotalPrice,
              totalWeight: mainCart.totalWeight + newTotalWeight,
            })
            .then(response => {
              dispatch(addToCartDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, ADD_TO_CART, error);
              showError(error);
            });
        } else {
          const mainCart = {
            user: data.uid,
            date: new Date().toDateString(),
            totalPrice: parseInt(data.amount) * parseInt(data.product.price),
            totalWeight: parseInt(data.amount) * parseFloat(data.product.weight),
          };
          FIREBASE.database()
            .ref('cart')
            .child(data.uid)
            .set(mainCart)
            .then(response => {
              dispatch(addToCartDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, ADD_TO_CART, error);
              showError(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_CART, error);
        showError(error);
      });
  };
};

export const addToCartDetail = data => {
  return dispatch => {
    console.log('dataaa', data)
    const orders = {
      product: data.product,
      orderAmount: data.amount,
      totalPrice: JSON.parse(JSON.stringify(parseInt(data.amount) * parseInt(data.product.price))) ,
      totalWeight: JSON.parse(JSON.stringify(parseInt(data.amount) * parseFloat(data.product.weight))),
    };
    FIREBASE.database()
      .ref('cart/' + data.uid)
      .child('orders')
      // .child(data.product.store)
      .push(orders)
      .then(response => {
        dispatchSuccess(dispatch, ADD_TO_CART, response ? response : []);
        // Clear Redux Data
        dispatchClear(dispatch, ADD_TO_CART);
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_CART, error);
        showError(error);
      });
  };
};

export const getCartList = id => {
console.log(`🚀 → file: CartAction.js → line 100 → id`, id)
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, GET_CART_LIST);
    console.log(`🚀 → file: CartAction.js → line 107 → querySnapshot`)
    FIREBASE.database()
      .ref('cart/' + id)
      .once('value', querySnapshot => {
        //Result
        let data = querySnapshot.val();
        // console.log("Data cart", data);

        // Success
        dispatchSuccess(dispatch, GET_CART_LIST, data);
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, GET_CART_LIST, error.message);
        showError(error.message);
      });
  };
};

export const deleteCartItem = (id, mainCart, orders) => {
  console.log('Reducer Delete', mainCart.user);
  console.log("cek orders", orders);
  return dispatch => {
    //Loading
    dispatchLoading(dispatch, DELETE_CART_ITEM);

    if (parseInt(mainCart.totalPrice - orders.totalPrice) === 0) {
      // Delete Cart
      FIREBASE.database()
        .ref('cart')
        .child(mainCart.user)
        .remove()
        .then(response => {
          // Success
          dispatchSuccess(dispatch, DELETE_CART_ITEM, []);
          showSucces("Produk berhasil dihapus dari keranjang!")
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, DELETE_CART_ITEM, error.message);
          showError(error.message);
        });
    } else {
      // Delete orders and update Cart
      console.log('Ada data cart', mainCart.user);
      FIREBASE.database()
        .ref('cart')
        .child(mainCart.user)
        .update({
          totalPrice: parseInt(mainCart.totalPrice - orders.totalPrice),
          totalWeight: parseFloat(mainCart.totalWeight - orders.totalWeight)
        })
        .then(response => {
            console.log("SUKSEEES");
          dispatch(deleteCartItemDetail(id, mainCart));
        })
        .catch(error => {
          //Error
          dispatchError(dispatch, DELETE_CART_ITEM, error.message);
          showError(error.message);
        });
    }
  };
};

export const deleteCartItemDetail = (id, mainCart) => {
  return dispatch => {
    FIREBASE.database()
      .ref('cart/' + mainCart.user)
      .child('orders')
      .child(id)
      .remove()
      .then(response => {
        // Success
        console.log("Pen baca buku")
        dispatchSuccess(dispatch, DELETE_CART_ITEM, []);
        showSucces("Produk berhasil dihapus dari keranjang!")
      })
      .catch(error => {
        //Error
        dispatchError(dispatch, DELETE_CART_ITEM, error.message);
        showError(error.message);
      });
  };
};
