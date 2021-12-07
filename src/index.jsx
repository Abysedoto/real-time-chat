import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxLZOm0Clw7_rzTcFXnJi1VKPpiTSJTM0",
  authDomain: "react-chat-f0c9d.firebaseapp.com",
  projectId: "react-chat-f0c9d",
  storageBucket: "react-chat-f0c9d.appspot.com",
  messagingSenderId: "1052476625633",
  appId: "1:1052476625633:web:c0c5e16d19673351705da0",
  measurementId: "G-LQW3HX1E8T"
};
export const Context = createContext(null);

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore,
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
