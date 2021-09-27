import { showMessage, hideMessage } from "react-native-flash-message";

export const showSucces = (message) => {
    showMessage({
        message: message,
        type: "success",
        floating: false,
        position:'top',
        icon:'auto',
      });
    
}

export const showError = (message) => {
    showMessage({
        message: message,
        type: "danger",
        floating: false,
        position:'top',
        icon:'auto',
      });
    
}


export const showWarning = (message) => {
  showMessage({
      message: message,
      type: 'warning',
      floating: false,
      position:'center',
      icon:'auto',
    });
  
}