import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import { Hub, Auth } from "aws-amplify";
import { GlobalContext } from "../Context/GlobalState";

const initialUserState = {
  user: null,
  userLoading: true,
  userSub: null,
  newUser: false,
};
// create context
export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);


  const { addUser } = useContext(GlobalContext);
  useEffect(() => {
    // set listener for auth events
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        setImmediate(() =>
          dispatch({
            type: "setUser",
            user: payload.data,
          })
        );
        // setImmediate(
        //   () => window.history.pushState({}, null, "http://localhost:3000/"),
        //   window.location.reload(false)
        // );
      }
      // this listener is needed for form sign ups since the OAuth will redirect & reload
      if (payload.event === "signOut") {
        setTimeout(
          () =>
            dispatch({
              type: "setUser",
              user: null,
            }),
          350
        );
      }
      //only set if the user just created an account
      if (payload.event == "signUp") {
      }
    });
    // we check for the current user unless there is a redirect to ?signedIn=true
    if (!window.location.search.includes("?signedin=true")) {
      checkUser(dispatch);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userLoading: state.userLoading,
        userSub: state.userSub,
        newUser: state.newUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function UserReducer(state, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
        userLoading: false,
        userSub: action.userSub,
      };
    case "loaded":
      return {
        ...state,
        userLoading: false,
      };
    default:
      return state;
  }
}

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: "setUser", user });
  } catch (err) {
    dispatch({ type: "loaded" });
  }
}

// function updateNewUser(dispatch){
//   dispatch({
//     type: "SET_NEW_USER",
//     payload: true,
//   });
// }
