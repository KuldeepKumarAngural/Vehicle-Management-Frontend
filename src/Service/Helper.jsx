import axios from "axios"
export const BASE_URL='http://localhost:1081/api/v1/auth';




export const myAxios = axios.create({
    baseURL:BASE_URL
    

 
});