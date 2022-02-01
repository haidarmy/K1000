export const SET_DARK_MODE = 'SET_DARK_MODE';

export const setDarkMode = (colorScheme) => {
// console.log(`🚀 → file: DarkModeAction.js → line 4 → setDarkMode → colorScheme`, colorScheme)
    
  return dispatch => {
    dispatch({
      type: SET_DARK_MODE,
      isDarkMode: colorScheme === 'dark' ? true : false,
      // isDarkMode: true,
    });
  };
};
