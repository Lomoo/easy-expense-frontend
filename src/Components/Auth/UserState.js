import React, {createContext, useReducer, useEffect} from 'react';
import { Hub, Auth } from "aws-amplify";


const initialUserState = { 
    user: null, userLoading: true, userSub:null
};
// create context
export const UserContext = createContext (initialUserState);


export const UserProvider= ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, initialUserState);

    useEffect(() => {
        // set listener for auth events
        Hub.listen("auth", (data) => {
          const { payload } = data;
          if (payload.event === "signIn") {
            console.log("user signed in in app");
            setImmediate(() => dispatch({ type: "setUser", user: payload.data }));
            setImmediate(() =>
              window.history.pushState({}, null, "http://localhost:3000/"),
              window.location.reload(false)
            );
            
          }
          // this listener is needed for form sign ups since the OAuth will redirect & reload
          if (payload.event === "signOut") {
            setTimeout(() => dispatch({ type: "setUser", user: null }), 350);
          }
    
          if(payload.event == "signUp"){
            console.log("New User Sign up");
          }
        });
        // we check for the current user unless there is a redirect to ?signedIn=true
        if (!window.location.search.includes("?signedin=true")) {
          checkUser(dispatch);
        }
      }, []);

    return (
        <UserContext.Provider value={{
            user: state.user,
            userLoading: state.userLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}


function UserReducer(state, action) {
    switch (action.type) {
      case "setUser":
        return { ...state, user: action.user, userLoading: false, userSub: action.user};
      case "loaded":
        return { ...state, userLoading: false };
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