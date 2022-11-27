import axios from "axios";

export const api = axios.create({
 baseURL: "http://localhost:3000/api/v1",
 withCredentials: false,
 headers: {
        "Content-type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "*/*",
    }
});

// api.interceptors.request.use(
//     (config) => {
//       config.headers.Authorization = `Bearer ${token}`;
   
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//    );

export const createSession = async (email, password) => {
    return api.post('/auth/sign_in', {email, password})
};