import firebase from 'firebase';
import Config from 'react-native-config';

firebase.initializeApp({
  apiKey: Config.FIREBASE_API_KEY,

  authDomain: Config.FIREBASE_API_AUTH,

  projectId: Config.FIREBASE_API_PROJECT_ID,

  storageBucket: Config.FIREBASE_API_STORAGE_BUCKET,

  messagingSenderId: Config.FIREBASE_API_MESSAGING_SENDER_ID,

  appId: Config.FIREBASE_API_APP_ID,
});

const FIREBASE = firebase;

export default FIREBASE;
