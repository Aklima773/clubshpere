import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useClubs = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading: clubLoading, data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs`);
            // console.log(res.data.cities)
            return res.data || []
        }
    })
    return { clubs, clubLoading };
};

export default useClubs;