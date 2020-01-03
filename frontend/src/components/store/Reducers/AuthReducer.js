const initalState = {
  authError: null
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case "login_failed":
      //console.log("log in failed");

      return {
        ...state,
        authError: " login failed"
      };

    case "login_success":
      //console.log("login successful");

      return {
        ...state,
        authError: null
      };

    case "signout_success":
      //console.log(" signout sucessfull");
      return state;

    case "successfull_signup":
      //console.log("signup successfull");
      return {
        ...state,
        authError: null
      };

    case "signup_error":
      //console.log("signup failed");
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
