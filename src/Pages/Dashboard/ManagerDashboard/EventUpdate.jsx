import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Container from '../../../Components/Container/Container';

import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router';

import Swal from 'sweetalert2';
import useClubs from '../../../CustomHooks/useClubs';


const EventUpdate = () => {


    // event id catch 
    const {id} = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {register,handleSubmit,reset, formState: {errors}, control} =useForm();

   
    

    const { isLoading: eventLoading, data: event, refetch} = useQuery({
        queryKey: ['event', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myevent/${id}`);
            
            return res.data;
        }
    })

    
    //categories calling

    const {clubs} = useClubs();

    const selectedClub = useWatch({control, name: 'clubName' })
    const selectedClubData = clubs.find((item)=> item.clubName === selectedClub)

   
    // handle cost 
const membershipFee = useWatch({control, name:"membershipFee"});

    useEffect(() =>{
        if(event){
            reset({
                eventName:event.eventName,
                clubName: event.clubName,
                description:event.description,
                clubId:event.clubId,
                city:event.location.city,
                area:event.location.area,
                eventDate: event.eventDate,
                membershipFee: event.membershipFee > 0 ? 'Paid' : 'Free',
                amount: event.membershipFee || '',

            });
        }
    }, [event,reset])

    const handleUpdate = (data) => {
        console.log('Updated data:', data);
        const updatedData = {
            eventName: data.eventName,
            clubName: data.clubName,
            clubId:selectedClubData._id,
            description: data.description,
            location: {
                city: data.city,
                area: data.area
            },
            eventDate: new Date(data.eventDate).getTime(),
            membershipFee:
              data.membershipType === 'Paid' ? Number(data.amount) : 0,
              
          };

          axiosSecure.patch(`/event/${id}`, updatedData)
          .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount) {
                refetch();
                navigate("/dashboard/manager/myevents")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${event.eventName} Update successfully`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
      };

      if (eventLoading) return <Loading />;


    return (
        <>
         <div className=''>
        <div className="hero  min-h-screen">
     <div className="card bg-base-100 w-sm lg:w-full mx-auto max-w-xl shrink-0 shadow-2xl mt-10">

      <Container className='my-4'>
        <div className='flex justify-center items-center my-4'>
     
        <h3 className="text-2xl text-center ">Update </h3>
          <div className='ml-2'><span className='text-center text-2xl text-[#f111db]'>Registered <spn className='text-[#487ce0]'>Event</spn></span></div>
        </div>
            

            <form onSubmit={handleSubmit(handleUpdate)} className="card-body" >

               
                <fieldset className="fieldset">
                     {/* name field */}
                   <label className="label">Event Name</label>
                    <input type="text"
                        {...register('eventName', { required: true })}
                        className="input input-bordered lg:w-[500px]"
                        />
                    {errors.eventName?.type === 'required' && <p className='text-red-500'>Event Name is required.</p>}




{/* Category  */}

<div className='flex w-full justify-center items-center gap-2'>
    <div className='left w-1/2'>
    <label className="label">Club Name</label>
                    <input type="text"
                        {...register('clubName', { required: true })}
                        className="input input-bordered"
                        />
    </div>

    <div className='right w-1/2'>
    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Club Name</legend>
                        <select {...register('clubName')} defaultValue={selectedClubData} className="select -mt-2.5">
                        <option value="">Select Club</option>
                            {clubs.map((item) => (
                                <option key={item._id} value={item.clubName}>
                                    {item.clubName}
                                </option>
                            ))}
                         
                        </select>
                    </fieldset>
    </div>
</div>

                    

                    {/* {errors.eventName?.type === 'required' && <p className='text-red-500'>Name is required.</p>} */}
                   

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

export default EventUpdate;