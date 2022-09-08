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
import {updateProductCancelCount} from './SalesReportAction';
import {updateProductCancelCountExpenditure} from './ExpenditureReportAction';

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
          //     dispatchError(dispatch, UPDATE_ORDER, error.message);
          //     showError(error.message);
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
                  dispatchError(dispatch, UPDATE_ORDER, error.message);
                  showError(error.message);
                });
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_ORDER, error.message);
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_ORDER, error.message);
        showError(error.message);
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
        dispatchSuccess(
          dispatch,
          GET_LIST_ORDER,
          dataSorted.length > 0 ? dataSorted : null,
        );
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_ORDER, error.message);
        showError(error.message);
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
            const handleCancelCount = data => {
              return Object.values(data)
                .map(e =>
                  Object.values(e.order).reduce(
                    (acc, curr) => acc + curr.orderAmount,
                    0,
                  ),
                )
                .reduce((acc, curr) => acc + curr, 0);
            };
            //TODO need to be tested later
            getData('user').then(res => {
              dispatch(
                updateProductCancelCountExpenditure(
                  handleCancelCount(querySnapshot.val()),
                  res.uid,
                ),
              );
            });
            let newData = {};
            const pushData = () => {
              return new Promise(resolve => {
                Object.keys(querySnapshot.val()).forEach(key => {
                  let temp = Object.assign({}, querySnapshot.val()[key]);
                  temp.status = status;
                  newData[`${key}`] = temp;
                  if (status === 'cancel') {
                    const cancelmount = Object.values(temp.order).reduce(
                      (acc, curr) => acc + curr.orderAmount,
                      0,
                    );
                    const storeId = temp.store.storeId;
                    dispatch(updateProductCancelCount(storeId, cancelmount));
                  }
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
                  dispatchError(dispatch, UPDATE_STATUS_ORDER, error.message);
                  showError(error.message);
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
        console.log('failed get axios', error.message);
        dispatchError(dispatch, UPDATE_STATUS_ORDER, error.message);
        showError(error.message);
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
              dispatchError(dispatch, COMPLETE_STATUS_ORDER, error.message);
              showError(error.message);
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
        dispatchError(dispatch, COMPLETE_STATUS_ORDER, error.message);
        showError(error.message);
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
              dispatchError(dispatch, UPDATE_PRODUCT_STOCK, error.message);
              showError(error.message);
            });
        })
        .catch(error => {
          dispatchError(dispatch, UPDATE_PRODUCT_STOCK, error.message);
          showError(error.message);
        });
    });
  };
};
