import axios from "axios";

export const api = axios.create({
 baseURL: "http://localhost:3000/api/v1",
 headers: {
        "Content-type": "application/json",
    }
});
var token = "";

api.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
   
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
   );

export const createSession = async (email, password) => {
    return api.post('/auth/sign_in', {email, password})
};