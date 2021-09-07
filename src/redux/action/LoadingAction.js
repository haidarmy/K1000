export const SET_LOADING = 'SET_LOADING';

export const setLoading = loading => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      loading: loading,
    });
  };
};
