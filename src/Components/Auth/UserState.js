import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import { Hub, Auth } from "aws-amplify";
const initialUserState = {
  user: null,
  userLoading: true,
  userSub: null,
};
// create context
export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);
  

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
        
      }
      
      if (payload.event === "signOut") {
        setTimeout(
          () =>
            dispatch({
              type: "signUserOut",
              user: null,
              userSub: null,
            }),
          350
        );
      }
      if (payload.event === "signUp"){
        console.log('hi');
      }
    });

    // we check for the current user unless there is a redirect to ?signedIn=true

      //console.log("hi at check user");
      checkUser(dispatch);
    
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userLoading: state.userLoading,
        userSub: state.userSub,
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
        userSub: action.user.signInUserSession.idToken.payload.sub,
      };
    case "signUserOut" :
      return{
        ...state,
        user: action.user,
        userSub : action.userSub,
      }
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

async function addUser(userSub) {
  console.log("called here");
  console.log(userSub);
  try {
    await fetch(`/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userSub,
      }),
    });
  } catch (err) {
    console.log("Unable to create user", err);
  }
}

// function updateNewUser(dispatch){
//   dispatch({
//     type: "SET_NEW_USER",
//     payload: true,
//   });
// }
