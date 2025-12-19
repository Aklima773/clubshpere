import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEvents = () => {

    
    const axiosSecure = useAxiosSecure();
    const { data,error,isLoading: eventsLoading} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allevents`);
            // console.log(res.data.cities)
            return res.data;
        }
    });


    const events = React.useMemo(() => {
        if (eventsLoading || error || !data) return [];
        return Array.isArray(data) ? data : [];
    }, [data, eventsLoading, error]);

    return { events, eventsLoading, error };

    
};

export default useEvents;