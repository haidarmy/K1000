import {StatusBar} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const showSucces = message => {
  showMessage({
    statusBarHeight: StatusBar.currentHeight,
    message: message,
    type: 'success',
    floating: true,
    position: 'top',
    icon: 'auto',
  });
};

export const showError = message => {
  showMessage({
    statusBarHeight: StatusBar.currentHeight,
    message: message,
    type: 'danger',
    floating: true,
    position: 'top',
    icon: 'auto',
  });
};

export const showWarning = message => {
  showMessage({
    statusBarHeight: StatusBar.currentHeight,
    message: message,
    type: 'warning',
    floating: true,
    position: 'center',
    icon: 'auto',
  });
};
