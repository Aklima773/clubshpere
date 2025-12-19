import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const axiosSecure = useAxiosSecure();
    const {  data, error, MisLoading: categoryLoading,} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories`);
            console.log('API Response:', res.data); // Debug what API returns
            return res.data;
        }
    });

    // ✅ SAFEGUARD: Always return array + handle all edge cases
    const categories = React.useMemo(() => {
        if (categoryLoading || error || !data) return [];
        return Array.isArray(data) ? data : [];
    }, [data, categoryLoading, error]);

    return { categories, categoryLoading, error };
};

export default useCategories;
