import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import firebase from '../config/firebase';

//react redux firebase config
export const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
}

/*
########section without applyMiddleware(thunk)##########
*/

// export const configureStore = () => {
//   const store = createStore(rootReducer, devToolsEnhancer());
//   return store;
// }  


/*
########section with applyMiddleware(thunk)##########
*/
export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument(getFirebase)];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    // reactReduxFirebase(firebase, rrfConfig),
    // reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);

  return store
}
