import { SubmissionError, reset } from 'redux-form';
import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants"
import { closeModal } from "../modals/modalActions";
import { toastr } from 'react-redux-toastr';

/*
  Authentication i.e basically register and login is handle by firebase even if you are using firestore as database.
*/


/**
 * 
 * @param {*} creds is an object consisting of values coming from login form.
 * If correct credentials are provided then the user is successfully authenticated as well as 
 * can be found in firebase reducer auth section as well 
 */
export const login = (creds) => { //if these braces are used then we have to specify the return statement
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      dispatch(closeModal())
    }
    catch (err) {
      throw new SubmissionError({
        _error: err.message
      })
    }
    // dispatch({ type: LOGIN_USER, payload: creds });
    // dispatch(closeModal())
  }
}

/**
 * 
 * @param {*} user is an object consisting of values coming from registration form.
 * Here registration is carried by firebase and successfully registered user is stored in firebase authentication 
 * and in firebase reducer auth as well
 */
export const registerUser = user => // if braces are not used then return is implied by default
  async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();
    try {
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      //when using updateProfile against user object returned by firebase then we're updating the profile in auth part of firebase
      await createdUser.user.updateProfile({
        displayName: user.displayName
      });
      // let newUser = {
      //   displayName: user.displayName,
      //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
      // }
      // console.log('new user', newUser);
      // await firebase.set(`users/${createdUser.user.uid}`, { ...newUser })
      // dispatch(closeModal())
    }
    catch (err) {
      throw new SubmissionError({
        _error: err.message
      })
    }
  }

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}

/**
 * 
 * @param {*} selectedProvider is social login you want to have i.e facebook google github e.t.c
 */
export const socialLogin = (selectedProvider, firestore) =>
  async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      dispatch(closeModal())
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

export const updatePassword = creds => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.confirmPassword);
      await dispatch(reset('accountUpdateForm'));
      toastr.success('Success', 'Your password has been updated');
    }
    catch (err) {
      throw new SubmissionError({
        _error: err.message
      })
    }
  }
}
