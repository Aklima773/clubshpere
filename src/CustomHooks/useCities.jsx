import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCities = () => {

    
    const axiosSecure = useAxiosSecure();
    const { isLoading: citiesLoading, data: cities = [] } = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cities`);
            // console.log(res.data.cities)
            return res.data || []
        }
    })
    return { cities, citiesLoading };
};

export default useCities;