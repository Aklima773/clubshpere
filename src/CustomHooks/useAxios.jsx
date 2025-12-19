import axios from 'axios';




const axiosIntance = axios.create({
    // baseUrl: 'https://clubspherebackend.vercel.app',

    baseUrl:'http://localhost:3000'
});

const useAxios = () => {

return axiosIntance;

};

export default useAxios;