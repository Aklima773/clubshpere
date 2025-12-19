import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCities = () => {

    
    const axiosSecure = useAxiosSecure();
    const { data,error,isLoading: citiesLoading} = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cities`);
            // console.log(res.data.cities)
            return res.data;
        }
    });


    const cities = React.useMemo(() => {
        if (citiesLoading || error || !data) return [];
        return Array.isArray(data) ? data : [];
    }, [data, citiesLoading, error]);

    return { cities, citiesLoading, error };

    
};

export default useCities;