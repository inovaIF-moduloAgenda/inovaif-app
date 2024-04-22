import axios from "axios";
const baseURL = "https://inova-if-api.vercel.app";


export function userLogged(){
    const response = axios.get(`${baseURL}/user/userAluna/`, {
        headers: {
          jwt_token: `${localStorage.getItem("token")}`,
        }
      });
      return response;
}

export function userLoggedProf(){
    const response = axios.get(`${baseURL}/user/userProfessora/`, {
        headers: {
          jwt_token: `${localStorage.getItem("token")}`,
        }
      });
      return response;
    
}