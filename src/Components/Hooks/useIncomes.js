import { useQuery } from "react-query";
import axios from "axios";


const baseHttpUrl = "https://easy-expense-server.herokuapp.com";

const apiUrl = baseHttpUrl + "/api/incomes/" ;

const getIncomes = async (userSub) => {
 
    const { data } = await axios.get(
        apiUrl + userSub 
    );
    return data;
  };
  
  export default function useIncomes( userSub) {
    return useQuery("incomes", () => getIncomes(userSub));
  }
  