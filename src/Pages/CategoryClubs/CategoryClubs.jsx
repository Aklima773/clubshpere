import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';

const CategoryClubs = () => {

  const { categoryId } = useParams();
  const axiosSecure = useAxiosSecure();

  
  

  const { data: categoryClubs = [], isLoading } = useQuery({
    queryKey: ['clubs', categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/categories/${categoryId}/clubs`);
      return res.data;
    },
  });

  console.log(categoryClubs)

   // fetch category info
   const { data: category, isLoading: catLoading } = useQuery({
    queryKey: ['category', categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/categories/${categoryId}`);
      // find category by id
      return res.data.find(cat => cat._id === categoryId);
    },
  });
  
    if (isLoading || catLoading) return <Loading />;

    
  
    return (
        <div>
            <h2>Clubs in {category?.categoryName}
            </h2>
            {categoryClubs.length === 0 ? (
        <p>No clubs found in this category</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {categoryClubs.map(club => (
            <div
              key={club._id}
              className="border p-4 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold">
                {club.clubName}
              </h3>
              <p>{club.location?.city}</p>
              <p className="text-sm text-gray-500">
                {club.category}
              </p>

              <img src={club.bannerImage} alt="" />
            </div>
          ))}
        </div>
      )}
        </div>
    );
};

export default CategoryClubs;