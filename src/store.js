import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from './reducers/notifyReducer'

//Reducers

//@todo

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzINrtCeOfVEaNV9cHbU4IsTzvViJqkFM",
  authDomain: "clientpanel-redux.firebaseapp.com",
  databaseURL: "https://clientpanel-redux.firebaseio.com",
  projectId: "clientpanel-redux",
  storageBucket: "clientpanel-redux.appspot.com",
  messagingSenderId: "709766723402",
  appId: "1:709766723402:web:a90d055cf032489c"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);

//Initialize firestore
// const firestore = firebase.firestore();


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
 
});

 
// //Check for settings in local storage
// if(localStorage.getItem('settings') == null){
//   //Default settings
//   const defaultSettings = {
//     disableBalanceOnAdd: true,
//     disableBalanceOnEdit: false,
//     allowRegistration:false
//   };

//   //Set to localStorage
//   localStorage.setItem('settings', JSON.stringify(defaultSettings)); 
// }


//Create initial state
 const initialState = { };


//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;