import * as firebase from 'firebase';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAmZDcd2FrTl1olH7lzN2m-KHUEhR_GuzU',
  authDomain: 'predki-demo.firebaseapp.com',
  databaseURL: 'https://predki-demo.firebaseio.com',
  projectId: 'predki-demo',
  storageBucket: 'predki-demo.appspot.com',
  messagingSenderId: '658230545184',
  appId: '1:658230545184:web:54268d4b3d897d1c096545'
});

export default app;
