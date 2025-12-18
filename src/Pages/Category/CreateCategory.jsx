import React from 'react';
import useAuth from '../../CustomHooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';

const CreateCategory = () => {
 
    const {
        register,
        handleSubmit,
      
        formState: {errors}
  
        // formState: { errors } 
    } = useForm();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {user} = useAuth();

    const handleCreateCategory = async (data) => {
        try {
            console.log(data);
    
            const categoryImage = data.categoryImage[0];
            const formData = new FormData();
            formData.append('image', categoryImage);
    
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;
    
            const categoryInfo = {
                categoryName: data.CategoryName,
                description: data.categoryDescription,
                img: photoURL,
                status: 'Actve',
                adminEmail: data.adminEmail,
                adminName: data.admin,
                createdAt: new Date()
            };
    
            const res = await axiosSecure.post('/category', categoryInfo);
            console.log('after saving category', res.data);
    
            if (res.data.insertedId) {
                navigate('/dashboard/admin/categories');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category has been created.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
    
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while creating the category!'
            });
        }
    };


    return (
        <div>
        <h2 className="text-5xl font-bold text-primary">Create Category</h2>
        <form onSubmit={handleSubmit(handleCreateCategory)} className='mt-12 p-4 text-black'>
          
            {/* {Club info} */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                <fieldset className="fieldset">
                    <label className="label">Category Name</label>
                    <input type="text" {...register('CategoryName')} className="input w-full" placeholder="Category Name" />
                </fieldset>


            </div>

            {/* two column */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* other Details */}

                <fieldset className="fieldset">
                    <h4 className="text-2xl font-semibold text-primary">Details of Category</h4>
                    {/* Creator name */}
                    <label className="label">Admin</label>
                    <input type="text" {...register('admin')}
                        defaultValue={user?.displayName}
                        className="input w-full" placeholder="Admin Name" />

                    {/* managCreatorer email */}
                    <label className="label">Admin Email</label>
                    <input type="text" {...register('adminEmail')}
                        defaultValue={user?.email}
                        className="input w-full" placeholder="Admin Email" />

                   


                    {/* descriotion */}
                    <label className="label mt-4">Category Description</label>
                    <textarea type="text" {...register('categoryDescription')} className="input w-full h-30" placeholder="Write here" />

                {/* status  */}


                    <label className="label">Status</label>
                    <input type="text" {...register('status')} defaultValue={'Active'} className="input w-full" placeholder="status" />
            



                </fieldset>


     
           

           {/* location  */}
                <fieldset className="fieldset">

                    {/* upload image*/}
                    <label className="label mt-4"> Category Image</label>
                    <input type="file" {...register('categoryImage')} className="input file-input file-input-bordered w-full" placeholder="Club Image Upload" />
                 {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}


{/* Payment  */}
     

                </fieldset>
            </div>
            <input type="submit" className='btn bg-primary text-white hover:bg-base-200 hover:text-black mt-8 text-black' value="Creat Category" />
        </form>
    </div>
    );
};

export default CreateCategory;