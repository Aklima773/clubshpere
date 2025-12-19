import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useClubs = () => {
    const axiosSecure = useAxiosSecure();
    const {data, error, isLoading: clubLoading} = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs`);
            // console.log(res.data.cities)
            return res.data || []
        }
    })


    const clubs = React.useMemo(() => {
        if (clubLoading || error || !data) return [];
        return Array.isArray(data) ? data : [];
    }, [data, clubLoading, error]);

    return { clubs, clubLoading, error };

    
};

export default useClubs;