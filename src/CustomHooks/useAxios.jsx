import axios from 'axios';




const axiosIntance = axios.create({
    baseUrl: 'https://clubspherebackend.vercel.app',
});

const useAxios = () => {

return axiosIntance;

};

export default useAxios;