import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCities = () => {

    
    const axiosSecure = useAxiosSecure();
    const { data} = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cities`);
            // console.log(res.data.cities)
            return res.data || []
        }
    })
    return { cities: Array.isArray(data) ? data : [] };
};

export default useCities;