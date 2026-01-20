import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';


const instance = axios.create({
   
    // baseURL:'https://clubspherebackend.vercel.app'

     baseURL: 'http://localhost:3000/'
})

const useAxiosSecure = () => {

    const {logOut} = useAuth();

    const navigate = useNavigate();
 

    //set token in the header for all the api call using axiosSecure hook

  //set token in the header for all the api call using axiosSecure hook

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });
  
    const responseInterceptor = instance.interceptors.response.use(
      res => res,
      error => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          logOut().then(() => navigate('/register'));
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);
  


return instance
};

export default useAxiosSecure;