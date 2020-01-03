import AuthReducer from "./AuthReducer";
import person from "./person";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  person: person
});

export default rootReducer;
