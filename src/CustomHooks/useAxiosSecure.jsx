import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';


const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {

    const {user, logOut} = useAuth();

    const navigate = useNavigate();
 

    //set token in the header for all the api call using axiosSecure hook

  //set token in the header for all the api call using axiosSecure hook

  useEffect(()=>{

    //request interceptor
    const requestInterceptor = instance.interceptors.request.use((config)=>{

        //token carry

        const token = user?.accessToken;
        if(token){
            config.headers.authorization =`Bearer ${token}`;
        }

        return config;


    });

    //response interceptor

    instance.interceptors.response.use(res=>{
        return res;
    }), (error)=>{

        const status = error.status
        if(status === 401 || status === 403){

        console.log('log out the user for bad request')
        logOut()
        .then (() => {
            navigate('/register')
        })

    }
};
return ()=>{
    instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject();
}
},
 [user, logOut, navigate]);


return instance
};

export default useAxiosSecure;