import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Container from '../../../Components/Container/Container';

import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router';
import useCategories from '../../../CustomHooks/useCategories';
import Swal from 'sweetalert2';


const MyClubsUpdate = () => {


    // club id catch 
    const {id} = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {register,handleSubmit,reset, formState: {errors}, control} =useForm();

   
    

    const { isLoading: clubLoading, data: club, refetch} = useQuery({
        queryKey: ['club', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/${id}`);
            
            return res.data;
        }
    })

    
    //categories calling

    const { categories} = useCategories();

    const selectedCategory = useWatch({control, name: 'category' })
    const selectedCategoryData = categories.find((item)=> item.category === selectedCategory)

   
    // handle cost 
const membershipFee = useWatch({control, name:"membershipFee"});

    useEffect(() =>{
        if(club){
            reset({
                clubName:club.clubName,
                description:club.description,
                category:club.category,
                membershipFee: club.membershipFee > 0 ? 'Paid' : 'Free',
                amount: club.membershipFee || '',

            });
        }
    }, [club,reset])

    const handleUpdate = (data) => {
        console.log('Updated data:', data);
        const updatedData = {
            clubName: data.clubName,
            category: data.category,
            description: data.description,
            membershipFee:
              data.membershipType === 'Paid' ? Number(data.amount) : 0,
          };

          axiosSecure.patch(`/clubs/${id}`, updatedData)
          .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount) {
                refetch();
                navigate("/dashboard/manager/myclubs")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${club.clubName} Update successfully`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
      };

      if (clubLoading) return <Loading />;


    return (
        <>
         <div className=''>
        <div className="hero  min-h-screen">
     <div className="card bg-base-100 w-sm lg:w-full mx-auto max-w-xl shrink-0 shadow-2xl mt-10">

      <Container className='my-4'>
        <div className='flex justify-center items-center my-4'>
     
        <h3 className="text-2xl text-center ">Update </h3>
          <div className='ml-2'><span className='text-center text-2xl text-[#f111db]'>Registered <spn className='text-[#487ce0]'>Club</spn></span></div>
        </div>
            

            <form onSubmit={handleSubmit(handleUpdate)} className="card-body" >

               
                <fieldset className="fieldset">
                     {/* name field */}
                   <label className="label">Club Name</label>
                    <input type="text"
                        {...register('clubName', { required: true })}
                        className="input input-bordered lg:w-[500px]"
                        />
                    {errors.clubName?.type === 'required' && <p className='text-red-500'>Club Name is required.</p>}




{/* Category  */}

<div className='flex w-full justify-center items-center gap-2'>
    <div className='left w-1/2'>
    <label className="label">Club Category</label>
                    <input type="text"
                        {...register('category', { required: true })}
                        className="input input-bordered"
                        />
    </div>

    <div className='right w-1/2'>
    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Club Category</legend>
                        <select {...register('category')} defaultValue={selectedCategoryData} className="select -mt-2.5">
                            <option >Select a Category</option>
                            <option value="photography" >Photograpgy</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                         
                        </select>
                    </fieldset>
    </div>
</div>

                    

                    {/* {errors.clubName?.type === 'required' && <p className='text-red-500'>Name is required.</p>} */}
                   

                   {/* membership fee  */}

                   <div className='flex w-full justify-center items-center gap-2'>

                    <div className="left w-1/2">
                    <label className="label">MemberShip Fee</label>
                    <input type="text"
                        {...register('membershipFee', { required: true })}
                        className="input input-bordered "
                        />

                    </div>

                    <div className="right w-1/2 ">


                   <div className='flex justify-center items-center gap-2'>
                    <div className='w-1/2'>
                    <label className="label "> Membership Cost</label>
                 <select {...register("membershipFee")} className="select select-bordered w-full ">



  <option value="" selected>Select Cost</option>
    <option  value={"Paid"}>Paid</option>
    <option  value={"Free"}>Free</option>
  
</select>
                    </div>

                    <div className='w-1/2'>
                    {membershipFee === "Paid" && (
        <>
          <label className="label">Enter Amount</label>
          <input
            type="number"
            {...register("amount")}
            placeholder="Enter amount"
            className="input input-bordered w-full "
          />
        </>
      )}
            
                    </div>
                   </div>

        </div>
                   </div>
                  


            <label className="label mt-3">Description</label>
            <textarea
              {...register('description')}
              className="textarea textarea-bordered w-full"
            />



                    <button className="btn btn-primary mt-4 hover:bg-base-200 border-0 hover:text-primary">Update</button>
                </fieldset>
             
            </form>
            </Container>
        </div>
        </div>
        </div>
        </>
        
    );
};

export default MyClubsUpdate;