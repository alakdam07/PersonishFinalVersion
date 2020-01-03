export const signIn = credential => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => {
        dispatch({ type: "login_success" });
      })
      .catch(err => {
        dispatch({ type: "login_failed", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "signout_success" });
      });
  };
};

export const signUp = createUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firstore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(createUser.email, createUser.password)
      .then(resp => {
        return firstore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstname: createUser.firstname,
            lastname: createUser.lastname,
            initials: createUser.firstname
          });
      })
      .then(() => {
        dispatch({ type: "successfull_signup" });
      })
      .catch(err => dispatch({ type: "signup_error", err }));
  };
};
