import FIREBASE from '../../config/FIREBASE';
import {
  dispatchClear,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
  API_TIMEOUT,
  URL_MIDTRANS_STATUS,
  HEADER_MIDTRANS,
  getData,
} from '../../utils';
import axios from 'axios';
import {isArray} from 'lodash';

export const UPDATE_ORDER = 'UPDATE_ORDER';
export const GET_LIST_ORDER = 'GET_LIST_ORDER';
export const UPDATE_STATUS_ORDER = 'UPDATE_STATUS_ORDER';
export const COMPLETE_STATUS_ORDER = 'COMPLETE_STATUS_ORDER';
export const UPDATE_PRODUCT_STOCK = 'UPDATE_PRODUCT_STOCK';

export const updateOrder = params => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_ORDER);

    const uid = params.order_id.split('-').pop();
    console.log('midtrans action', uid);

    FIREBASE.database()
      .ref('cart/' + uid)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const data = {...params};
          console.log('data', data);

          // FIREBASE.database()
          //   .ref('orders')
          //   .child(params.order_id)
          //   .set(data)
          //   .then(response => {
          //     dispatchSuccess(dispatch, UPDATE_ORDER, response ? response : []);
          //   })
          //   .catch(error => {
          //     dispatchError(dispatch, UPDATE_ORDER, error);
          //     showError(error);
          //   });

          FIREBASE.database()
            .ref('cart/' + uid)
            .remove()
            .then(() => {
              FIREBASE.database()
                .ref('orders')
                .child(params.order_id)
                .set(data)
                .then(response => {
                  dispatchSuccess(
                    dispatch,
                    UPDATE_ORDER,
                    response ? response : [],
                  );
                })
                .catch(error => {
                  dispatchError(dispatch, UPDATE_ORDER, error);
                  showError(error);
                });
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_ORDER, error);
              showError(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_ORDER, error);
        showError(error);
      });
  };
};

export const getListOrder = uid => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_ORDER);

    FIREBASE.database()
      .ref('orders')
      .orderByChild('user')
      .equalTo(uid)
      .once('value', querySnapshot => {
        // let data = querySnapshot.val();
        // console.log('dataaa', data);
        let dataSorted = [];
        querySnapshot.forEach(e => {
          dataSorted.unshift({...e.val()});
        });
        dispatchSuccess(dispatch, GET_LIST_ORDER, dataSorted.length > 0 ? dataSorted : null);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_ORDER, error);
        showError(error);
      });
  };
};

export const updateStatusOrder = order_id => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_STATUS_ORDER);
    axios({
      method: 'GET',
      url: URL_MIDTRANS_STATUS + `${order_id}/status`,
      headers: HEADER_MIDTRANS,
      timeout: API_TIMEOUT,
    })
      .then(response => {
        const status =
          response.data.transaction_status === 'settlement' ||
          response.data.transaction_status === 'capture'
            ? 'packed'
            : response.data.transaction_status === 'deny' ||
              response.data.transaction_status === 'cancel' ||
              response.data.transaction_status === 'expire' ||
              response.data.transaction_status === 'failure'
            ? 'cancel'
            : 'pending';
        FIREBASE.database()
          .ref('orders/' + order_id)
          .child('orderDetails')
          .orderByChild('status')
          .once('value', querySnapshot => {
            let newData = {};
            const pushData = () => {
              return new Promise(resolve => {
                Object.keys(querySnapshot.val()).forEach(key => {
                  let temp = Object.assign({}, querySnapshot.val()[key]);
                  temp.status = status;
                  newData[`${key}`] = temp;
                });
                if (
                  Object.values(querySnapshot.val()).length ===
                  Object.keys(newData).length
                ) {
                  resolve();
                }
              });
            };
            const updateDataDB = () => {
              FIREBASE.database()
                .ref('orders/' + order_id)
                .child('orderDetails')
                .update(newData)
                .then(response => {
                  getData('user').then(res => getListOrder(res.uid));
                  dispatchSuccess(
                    dispatch,
                    UPDATE_STATUS_ORDER,
                    response ? response : [],
                  );
                })
                .catch(error => {
                  dispatchError(dispatch, UPDATE_STATUS_ORDER, error);
                  showError(error);
                });
            };

            const updateData = async () => {
              await pushData();
              updateDataDB();
            };
            updateData();
          });
      })
      .catch(error => {
        console.log('failed get axios', error);
        dispatchError(dispatch, UPDATE_STATUS_ORDER, error);
        showError(error);
      });
  };
};

export const completeStatusOrder = (orderId, storeId, balance) => {
  return dispatch => {
    dispatchLoading(dispatch, COMPLETE_STATUS_ORDER);
    Promise.all([
      FIREBASE.database()
        .ref('orders/' + orderId)
        .child('orderDetails/' + storeId)
        // .orderByChild('status')
        .update({status: 'finished'}),
      FIREBASE.database()
        .ref('users/' + storeId)
        .once('value', querySnapshot => {
          let oldBalance = querySnapshot.val().balance;
          FIREBASE.database()
            .ref('users/' + storeId)
            .update({balance: parseInt(balance) + parseInt(oldBalance)})
            .catch(error => {
              dispatchError(dispatch, COMPLETE_STATUS_ORDER, error);
              showError(error);
            });
        }),
    ])
      .then(response => {
        dispatchSuccess(
          dispatch,
          COMPLETE_STATUS_ORDER,
          response ? 'Complete order successfully' : [],
        );
        getData('user').then(res => {
          if (res) {
            dispatch(getListOrder(res.uid));
          }
        });
      })
      .catch(error => {
        dispatchError(dispatch, COMPLETE_STATUS_ORDER, error);
        showError(error);
      });
  };
};

export const updateProductStock = data => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_STOCK);
    Object.values(data).forEach(item => {
      console.log(item.product.productId);
      FIREBASE.database()
        .ref('product/' + item.product.productId)
        .once('value', querySnapshot => {
          let oldStock = querySnapshot.val().stock;
          let oldSold = querySnapshot.val().sold;
          FIREBASE.database()
            .ref('product/' + item.product.productId)
            .update({
              stock: parseInt(oldStock) - parseInt(item.orderAmount),
              sold: parseInt(oldSold) + parseInt(item.orderAmount),
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PRODUCT_STOCK, error);
              showError(error);
            });
        })
        .catch(error => {
          dispatchError(dispatch, UPDATE_PRODUCT_STOCK, error);
          showError(error);
        });
    });
  };
};
