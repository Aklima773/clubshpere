import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories`);
            // console.log(res.data.cities)
            return res.data;
        }
    })
    return { categories: Array.isArray(data) ? data : [] }
};

export default useCategories;