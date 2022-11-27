import React, {useEffect, useState, createContext} from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession} from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if(recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false);

    }, []);

    const login = async (email, password, logar) => {
        
        const response = await createSession(email, password);
        
        console.log(response);
       
        const loggedUser = {
            "id": response.data.data.id,
            "nome": response.data.data.nome,
            "email": response.data.email
        };

        const token = response.headers.Authorization;
        // const client = response.data.client;
        // const uid = response.data.uid;
        
        api.defaults.headers.access_token = {token};
        // api.defaults.headers.client = {client};
        // api.defaults.headers.uid = {uid};

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);
        // localStorage.setItem("client", client);
        // localStorage.setItem("uid", uid);
        
        setUser(loggedUser);
        logar();
        navigate('/principal');
    };
    
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // localStorage.removeItem("client");
        // localStorage.removeItem("uid");

        const token = null;
        // const client = null;
        // const uid = null;

        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider
                        value={{
                          authenticated: !!user,
                          user,
                          loading, 
                          login,
                          logout
                        }}>
            { children }
        </AuthContext.Provider>
    );

};