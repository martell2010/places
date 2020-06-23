import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyBeFCpVT8fSA25tq53nepyZJTu68GEP_Gw',
  authDomain: 'martell-places.firebaseapp.com',
  databaseURL: 'https://martell-places.firebaseio.com',
  projectId: 'martell-places',
  storageBucket: 'martell-places.appspot.com',
  messagingSenderId: '127326388022',
  appId: '1:127326388022:web:effd86eaa509a2ef9efd97',
  measurementId: 'G-RBK9QXLR7B'
});

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

export const storage = firebase.storage();
export const db = firebase.firestore()