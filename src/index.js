import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './app/layout/App';
import ReduxToastr from 'react-redux-toastr';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, rrfConfig } from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';
import firebase from '../src/app/config/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rrfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
