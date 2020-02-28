import { toastr } from "react-redux-toastr";
import { initialize} from 'redux-form';

export const updateProfile = (user) =>
  async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user; //don't want to send isLoaded and isEmpty to firestore 
    try {
      //when using updateProfile directly on firebase then we're updating the profile in firestore it has nothing to do with firebase
      await firebase.updateProfile(updatedUser);
      // await dispatch(initialize('userProfile')); 
      toastr.success('Success', 'Your profile has been updated')
    }
    catch (err) {
      console.log(err)
    }
  }
