import axios from 'axios';




const axiosIntance = axios.create({
    // baseUrl: 'https://clubspherebackend.vercel.app',

    baseUrl:'http://localhost:5173'
});

const useAxios = () => {

return axiosIntance;

};

export default useAxios;