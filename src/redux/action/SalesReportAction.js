import FIREBASE from '../../config/FIREBASE';
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';
import {
  getCurrentDate,
  getCurrentTimeFrameType,
  getEpochTime,
  getFiveDayUpdateDate,
  handleUndefinedData,
  isAMonthDifference,
} from '../../utils/salesReportHelper';

export const UPDATE_PRODUCT_VIEW_COUNT = 'UPDATE_PRODUCT_VIEW_COUNT';
export const UPDATE_PRODUCT_CANCEL_COUNT = 'UPDATE_PRODUCT_CANCEL_COUNT';
export const UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT =
  'UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT';
export const GET_USER_SALES_REPORT = 'GET_USER_SALES_REPORT';

export const getUserSalesReport = (uid, type, isFirstRender) => {
  return dispatch => {
    isFirstRender && dispatchLoading(dispatch, GET_USER_SALES_REPORT);
    FIREBASE.database()
      .ref(`salesReport/${uid}/${getCurrentTimeFrameType(type)}`)
      .orderByChild('date')
      .startAt(getCurrentDate(new Date(), 'START', type))
      .endAt(getCurrentDate(new Date(), 'END', type))
      .once('value', querySnapshot => {
        // if (querySnapshot.val()) {
          const res = Object.values(querySnapshot.val() ?? {});
          const isThereUndefinedData = () => {
            switch (type) {
              case 'WEEKLY':
                return res.length < 7;
              case 'MONTHLY':
                return res.length < 6;
              case 'BIYEARLY':
                return res.length < 6;
              default:
                break;
            }
          };
          const customDate = type === 'MONTHLY' && (res[res.length - 1] ?? {}).date;
          const newData = isThereUndefinedData()
            ? handleUndefinedData(
                querySnapshot.val() ?? {},
                type,
                uid,
                getCurrentDate(new Date(), undefined, undefined, true),
                customDate ?? "",
              )
            : querySnapshot.val();
          dispatchSuccess(dispatch, GET_USER_SALES_REPORT, Object.values(querySnapshot.val() ?? {}).length ? newData : null);
        // }
      })
      .catch(error => {
        dispatchError(dispatch, GET_USER_SALES_REPORT, error.message);
        showError(error.message);
      });
  };
};

const updateDBView = (storeId, type, date = new Date()) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `salesReport/${storeId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              salesDetails: {
                ...prevSales.salesDetails,
                viewed: prevSales.salesDetails.viewed + 1,
              },
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PRODUCT_VIEW_COUNT, error.message);
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              categoryList: false,
              date: getCurrentDate(date, undefined, type, true),
              revenue: 0,
              salesDetails: {
                viewed: 1,
                cancel: 0,
                sold: 0,
              },
              uid: storeId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PRODUCT_VIEW_COUNT, error.message);
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductViewCount = storeId => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_VIEW_COUNT);
    FIREBASE.database()
      .ref(`salesReport/${storeId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(updateDBView(storeId, 'BIYEARLY')),
            dispatch(updateDBView(storeId, 'WEEKLY')),
            FIREBASE.database()
              .ref(
                `salesReport/${storeId}/${getCurrentTimeFrameType('MONTHLY')}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `salesReport/${storeId}/${getCurrentTimeFrameType(
                        'MONTHLY',
                      )}/${getCurrentDate(new Date(), undefined, 'MONTHLY')}`,
                    )
                    .update({
                      categoryList: false,
                      date: getCurrentDate(
                        new Date(),
                        undefined,
                        'MONTHLY',
                        true,
                      ),
                      revenue: 0,
                      salesDetails: {
                        viewed: 1,
                        cancel: 0,
                        sold: 0,
                      },
                      uid: storeId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_VIEW_COUNT,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_VIEW_COUNT,
                        error.message,
                      );
                      showError(error.message);
                    });
                } else {
                  const newDate = getFiveDayUpdateDate(
                    startDate,
                    getCurrentDate(new Date(), undefined, undefined, true),
                  );
                  dispatch(
                    updateDBView(
                      storeId,
                      'MONTHLY',
                      new Date(newDate.year, newDate.month, newDate.day),
                    ),
                  );
                }
              }),
          ])
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PRODUCT_VIEW_COUNT, error.message);
              showError(error.message);
            });
        } else {
          const initialSalesReport = {
            daily: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'WEEKLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 1,
                  cancel: 0,
                  sold: 0,
                },
                uid: storeId,
              },
            },
            [`five-days`]: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'MONTHLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 1,
                  cancel: 0,
                  sold: 0,
                },
                uid: storeId,
              },
            },
            monthly: {
              [`${getCurrentDate(new Date(), undefined, 'BIYEARLY')}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'BIYEARLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 1,
                  cancel: 0,
                  sold: 0,
                },
                uid: storeId,
              },
            },
          };
          FIREBASE.database()
            .ref('salesReport')
            .child(storeId)
            .set(initialSalesReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PRODUCT_VIEW_COUNT, error.message);
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_PRODUCT_VIEW_COUNT, error.message);
        showError(error.message);
      });
  };
};

const updateDBCancel = (storeId, type, cancelAmount, date = new Date()) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `salesReport/${storeId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              salesDetails: {
                ...prevSales.salesDetails,
                cancel: prevSales.salesDetails.cancel + cancelAmount,
              },
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                error.message,
              );
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              categoryList: false,
              date: getCurrentDate(date, undefined, type, true),
              revenue: 0,
              salesDetails: {
                viewed: 0,
                cancel: cancelAmount,
                sold: 0,
              },
              uid: storeId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                error.message,
              );
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductCancelCount = (storeId, cancelAmount) => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_CANCEL_COUNT);
    FIREBASE.database()
      .ref(`salesReport/${storeId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(updateDBCancel(storeId, 'BIYEARLY', cancelAmount)),
            dispatch(updateDBCancel(storeId, 'WEEKLY', cancelAmount)),
            FIREBASE.database()
              .ref(
                `salesReport/${storeId}/${getCurrentTimeFrameType('MONTHLY')}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `salesReport/${storeId}/${getCurrentTimeFrameType(
                        'MONTHLY',
                      )}/${getCurrentDate(new Date(), undefined, 'MONTHLY')}`,
                    )
                    .update({
                      categoryList: false,
                      date: getCurrentDate(
                        new Date(),
                        undefined,
                        'MONTHLY',
                        true,
                      ),
                      revenue: 0,
                      salesDetails: {
                        viewed: 0,
                        cancel: cancelAmount,
                        sold: 0,
                      },
                      uid: storeId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_CANCEL_COUNT,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_CANCEL_COUNT,
                        error.message,
                      );
                      showError(error.message);
                    });
                } else {
                  const newDate = getFiveDayUpdateDate(
                    startDate,
                    getCurrentDate(new Date(), undefined, undefined, true),
                  );
                  dispatch(
                    updateDBCancel(
                      storeId,
                      'MONTHLY',
                      cancelAmount,
                      new Date(newDate.year, newDate.month, newDate.day),
                    ),
                  );
                }
              }),
          ])
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                error.message,
              );
              showError(error.message);
            });
        } else {
          const initialSalesReport = {
            daily: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'WEEKLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 0,
                  cancel: cancelAmount,
                  sold: 0,
                },
                uid: storeId,
              },
            },
            [`five-days`]: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'MONTHLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 0,
                  cancel: cancelAmount,
                  sold: 0,
                },
                uid: storeId,
              },
            },
            monthly: {
              [`${getCurrentDate(new Date(), undefined, 'BIYEARLY')}`]: {
                categoryList: false,
                date: getCurrentDate(new Date(), undefined, 'BIYEARLY', true),
                revenue: 0,
                salesDetails: {
                  viewed: 0,
                  cancel: cancelAmount,
                  sold: 0,
                },
                uid: storeId,
              },
            },
          };
          FIREBASE.database()
            .ref('salesReport')
            .child(storeId)
            .set(initialSalesReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT,
                error.message,
              );
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_PRODUCT_CANCEL_COUNT, error.message);
        showError(error.message);
      });
  };
};

const updateDBSoldAndRevenueAndCategory = (
  storeId,
  type,
  soldAmount,
  revenue,
  handleCategoryList,
  date = new Date(),
) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `salesReport/${storeId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              categoryList: handleCategoryList(prevSales.categoryList),
              revenue: prevSales.revenue + revenue,
              salesDetails: {
                ...prevSales.salesDetails,
                sold: prevSales.salesDetails.sold + soldAmount,
              },
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                error.message,
              );
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `salesReport/${storeId}/${getCurrentTimeFrameType(
                type,
              )}/${getCurrentDate(date, undefined, type)}`,
            )
            .update({
              categoryList: handleCategoryList(),
              date: getCurrentDate(date, undefined, type, true),
              revenue: revenue,
              salesDetails: {
                viewed: 0,
                cancel: 0,
                sold: soldAmount,
              },
              uid: storeId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                error.message,
              );
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductSoldAndRevenueAndCategoryCount = (
  storeId,
  soldAmount,
  revenue,
  categoryList,
) => {
  const handleCategoryList = (oldData = {}) => {
    const update = {...oldData};
    Object.values(categoryList).forEach(
      e =>
        (update[`${e.product.category}`] = {
          id: e.product.category,
          name: e.product.categoryName,
          sold: e.totalWeight + (oldData[`${e.product.category}`]?.sold ?? 0),
        }),
    );
    return update;
  };
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT);
    FIREBASE.database()
      .ref(`salesReport/${storeId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(
              updateDBSoldAndRevenueAndCategory(
                storeId,
                'BIYEARLY',
                soldAmount,
                revenue,
                handleCategoryList,
              ),
            ),
            dispatch(
              updateDBSoldAndRevenueAndCategory(
                storeId,
                'WEEKLY',
                soldAmount,
                revenue,
                handleCategoryList,
              ),
            ),
            FIREBASE.database()
              .ref(
                `salesReport/${storeId}/${getCurrentTimeFrameType('MONTHLY')}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `salesReport/${storeId}/${getCurrentTimeFrameType(
                        'MONTHLY',
                      )}/${getCurrentDate(new Date(), undefined, 'MONTHLY')}`,
                    )
                    .update({
                      categoryList: handleCategoryList(),
                      date: getCurrentDate(
                        new Date(),
                        undefined,
                        'MONTHLY',
                        true,
                      ),
                      revenue: revenue,
                      salesDetails: {
                        viewed: 0,
                        cancel: 0,
                        sold: soldAmount,
                      },
                      uid: storeId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                        error.message,
                      );
                      showError(error.message);
                    });
                } else {
                  const newDate = getFiveDayUpdateDate(
                    startDate,
                    getCurrentDate(new Date(), undefined, undefined, true),
                  );
                  dispatch(
                    updateDBSoldAndRevenueAndCategory(
                      storeId,
                      'MONTHLY',
                      soldAmount,
                      revenue,
                      handleCategoryList,
                      new Date(newDate.year, newDate.month, newDate.day),
                    ),
                  );
                }
              }),
          ])
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                error.message,
              );
              showError(error.message);
            });
        } else {
          const initialSalesReport = {
            daily: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: handleCategoryList(),
                date: getCurrentDate(new Date(), undefined, 'WEEKLY', true),
                revenue: revenue,
                salesDetails: {
                  viewed: 0,
                  cancel: 0,
                  sold: soldAmount,
                },
                uid: storeId,
              },
            },
            [`five-days`]: {
              [`${getCurrentDate(new Date())}`]: {
                categoryList: handleCategoryList(),
                date: getCurrentDate(new Date(), undefined, 'MONTHLY', true),
                revenue: revenue,
                salesDetails: {
                  viewed: 0,
                  cancel: 0,
                  sold: soldAmount,
                },
                uid: storeId,
              },
            },
            monthly: {
              [`${getCurrentDate(new Date(), undefined, 'BIYEARLY')}`]: {
                categoryList: handleCategoryList(),
                date: getCurrentDate(new Date(), undefined, 'BIYEARLY', true),
                revenue: revenue,
                salesDetails: {
                  viewed: 0,
                  cancel: 0,
                  sold: soldAmount,
                },
                uid: storeId,
              },
            },
          };
          FIREBASE.database()
            .ref('salesReport')
            .child(storeId)
            .set(initialSalesReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
                error.message,
              );
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(
          dispatch,
          UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT,
          error.message,
        );
        showError(error.message);
      });
  };
};
