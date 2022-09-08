import FIREBASE from '../../config/FIREBASE';
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  getData,
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

export const GET_USER_EXPENDITURE_REPORT = 'GET_USER_EXPENDITURE_REPORT';
export const UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE =
  'UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE';
export const UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE =
  'UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE';
export const UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE =
  'UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE';

export const getUserExpenditureReport = (uid, type, isFirstRender) => {
  return dispatch => {
    isFirstRender && dispatchLoading(dispatch, GET_USER_EXPENDITURE_REPORT);
    FIREBASE.database()
      .ref(`expenditureReport/${uid}/${getCurrentTimeFrameType(type)}`)
      .orderByChild('date')
      .startAt(getCurrentDate(new Date(), 'START', type))
      .endAt(getCurrentDate(new Date(), 'END', type))
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const res = Object.values(querySnapshot.val());
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
          const customDate = type === 'MONTHLY' && res[res.length - 1].date;
          const newData = isThereUndefinedData()
            ? handleUndefinedData(
                querySnapshot.val(),
                type,
                uid,
                getCurrentDate(new Date(), undefined, undefined, true),
                customDate,
              )
            : querySnapshot.val();
          dispatchSuccess(dispatch, GET_USER_EXPENDITURE_REPORT, newData);
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_USER_EXPENDITURE_REPORT, error.message);
        showError(error.message);
      });
  };
};

const updateDBView = (userId, type, date = new Date()) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `expenditureReport/${userId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
              uid: userId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductViewCountExpenditure = userId => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE);
    FIREBASE.database()
      .ref(`expenditureReport/${userId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(updateDBView(userId, 'BIYEARLY')),
            dispatch(updateDBView(userId, 'WEEKLY')),
            FIREBASE.database()
              .ref(
                `expenditureReport/${userId}/${getCurrentTimeFrameType(
                  'MONTHLY',
                )}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                      uid: userId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
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
                      userId,
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
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          const initialExpenditureReport = {
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
                uid: userId,
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
                uid: userId,
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
                uid: userId,
              },
            },
          };
          FIREBASE.database()
            .ref('expenditureReport')
            .child(userId)
            .set(initialExpenditureReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(
          dispatch,
          UPDATE_PRODUCT_VIEW_COUNT_EXPENDITURE,
          error.message,
        );
        showError(error.message);
      });
  };
};

const updateDBCancel = (userId, type, cancelAmount, date = new Date()) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `expenditureReport/${userId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
              uid: userId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductCancelCountExpenditure = (cancelAmount, userId) => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE);
    FIREBASE.database()
      .ref(`expenditureReport/${userId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(updateDBCancel(userId, 'BIYEARLY', cancelAmount)),
            dispatch(updateDBCancel(userId, 'WEEKLY', cancelAmount)),
            FIREBASE.database()
              .ref(
                `expenditureReport/${userId}/${getCurrentTimeFrameType(
                  'MONTHLY',
                )}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                      uid: userId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
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
                      userId,
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
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          const initialExpenditureReport = {
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
                uid: userId,
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
                uid: userId,
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
                uid: userId,
              },
            },
          };
          FIREBASE.database()
            .ref('expenditureReport')
            .child(userId)
            .set(initialExpenditureReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(
          dispatch,
          UPDATE_PRODUCT_CANCEL_COUNT_EXPENDITURE,
          error.message,
        );
        showError(error.message);
      });
  };
};

const updateDBSoldAndRevenueAndCategory = (
  userId,
  type,
  soldAmount,
  revenue,
  handleCategoryList,
  date = new Date(),
) => {
  return dispatch => {
    FIREBASE.database()
      .ref(
        `expenditureReport/${userId}/${getCurrentTimeFrameType(
          type,
        )}/${getCurrentDate(date, undefined, type)}`,
      )
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const prevSales = querySnapshot.val();
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          FIREBASE.database()
            .ref(
              `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
              uid: userId,
            })
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      });
  };
};

export const updateProductSoldAndRevenueAndCategoryCountExpenditure = (
  soldAmount,
  revenue,
  categoryList,
  userId,
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
    dispatchLoading(
      dispatch,
      UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
    );
    FIREBASE.database()
      .ref(`expenditureReport/${userId}`)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          Promise.all([
            dispatch(
              updateDBSoldAndRevenueAndCategory(
                userId,
                'BIYEARLY',
                soldAmount,
                revenue,
                handleCategoryList,
              ),
            ),
            dispatch(
              updateDBSoldAndRevenueAndCategory(
                userId,
                'WEEKLY',
                soldAmount,
                revenue,
                handleCategoryList,
              ),
            ),
            FIREBASE.database()
              .ref(
                `expenditureReport/${userId}/${getCurrentTimeFrameType(
                  'MONTHLY',
                )}`,
              )
              .limitToLast(1)
              .once('value', querySnapshot => {
                const startDate = Object.keys(querySnapshot.val())
                  ?.toString()
                  .replace(/-/g, '');
                if (isAMonthDifference(getEpochTime(startDate), new Date())) {
                  FIREBASE.database()
                    .ref(
                      `expenditureReport/${userId}/${getCurrentTimeFrameType(
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
                      uid: userId,
                    })
                    .then(response => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                        response ?? [],
                      );
                    })
                    .catch(error => {
                      dispatchError(
                        dispatch,
                        UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
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
                      userId,
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
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        } else {
          const initialExpenditureReport = {
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
                uid: userId,
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
                uid: userId,
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
                uid: userId,
              },
            },
          };
          FIREBASE.database()
            .ref('expenditureReport')
            .child(userId)
            .set(initialExpenditureReport)
            .then(response => {
              dispatchSuccess(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                response ?? [],
              );
            })
            .catch(error => {
              dispatchError(
                dispatch,
                UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
                error.message,
              );
              showError(error.message);
            });
        }
      })
      .catch(error => {
        dispatchError(
          dispatch,
          UPDATE_PRODUCT_SOLD_REVENUE_CATEGORY_COUNT_EXPENDITURE,
          error.message,
        );
        showError(error.message);
      });
  };
};
