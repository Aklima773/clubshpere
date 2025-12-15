import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading: categoryLoading, data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories`);
            // console.log(res.data.cities)
            return res.data || []
        }
    })
    return { categories, categoryLoading };
};

export default useCategories;