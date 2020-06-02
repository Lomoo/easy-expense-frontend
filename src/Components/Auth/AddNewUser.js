import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { UserContext } from "./UserState";

export const AddNewUser = () => {
    const { addUser  } = useContext(GlobalContext);
    const { newUser, setNewUser } = useContext(UserContext);

    if (newUser){
        addUser();
        setNewUser(false);
    }
    return (null);
}
