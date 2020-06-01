import { UserContext } from "./UserContext";
import { useContext } from "react";


export async function CreateUser() {
    const { userState } = useContext(UserContext);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userState.user.signInUserSession.idToken.payload.sub })
    };
    try{
        const data = await fetch('http://localhost:8080/api/users', requestOptions);
        console.log(data.response.json());
    }
    catch(e){
        console.log("err in create user: " + e )
    }
        
}

