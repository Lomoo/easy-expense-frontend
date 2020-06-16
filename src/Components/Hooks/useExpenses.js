import { useQuery, useContext } from "react-query";
import axios from "axios";
import { UserContext } from "../Auth/UserState";

const baseHttpUrl = "https://easy-expense-server.herokuapp.com";

const apiUrl = baseHttpUrl + "/api/expenses/" ;

const getExpenses = async (userSub) => {
 
   
    const { data } = await axios.get(
        apiUrl + userSub 
    );
    return data;
  };
  

  
  export default function useExpenses( userSub) {
    return useQuery("expenses", () => getExpenses(userSub));
  }
  