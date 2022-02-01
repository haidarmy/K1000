import {SET_DARK_MODE} from '../../action/DarkModeAction';

const initialState = {
  isDarkMode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DARK_MODE:
    //   console.log(`🚀 → file: index.js → line 9 → action`, action.isDarkMode);
      return {
        ...state,
        isDarkMode: action.isDarkMode,
      };
    default:
      return state;
  }
}
