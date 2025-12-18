import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useClubs = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs`);
            // console.log(res.data.cities)
            return res.data;
        }
    })
    return { clubs: Array.isArray(data) ? data : [] };
};

export default useClubs;