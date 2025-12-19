import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../CustomHooks/useAuth';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useCities from '../../CustomHooks/useCities';
import Swal from 'sweetalert2';
import axios from 'axios';
import useClubs from '../../CustomHooks/useClubs';

const CreateEvents = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { clubs } = useClubs();
    const { cities } = useCities();

    // Watch form fields
    const selectedClubName = useWatch({ control, name: "clubName" });
    const selectedCity = useWatch({ control, name: "city" });

    // State for filtered data
    const [clubCity, setClubCity] = useState([]);
    const [cityAreas, setCityAreas] = useState([]);

    // Get selected club data and update city
    const selectedClubData = clubs.find(c => c.clubName === selectedClubName);
    useEffect(() => {
      if (selectedClubData?.location?.city) {
          const cityName = selectedClubData.location.city;
          setClubCity([cityName]);                          
          setValue("city", cityName);
          
          // Find areas for this city
          const cityData = cities.find(c => c.city === cityName);
          setCityAreas(cityData?.areas || []);           
          setValue("area", "");
      } else {
          setClubCity([]);                                  
          setCityAreas([]);
          setValue("city", "");
          setValue("area", "");
      }
  }, [selectedClubName, selectedClubData, cities, setValue]);
  

    // Update areas when city changes manually
    useEffect(() => {
      if (selectedCity && cities.length > 0) {
          const cityData = cities.find(c => c.city === selectedCity);
          setCityAreas(cityData?.areas || []);  
          setValue("area", "");
      }
  }, [selectedCity, cities, setValue]);
  

    const membershipCost = useWatch({ control, name: "membershipCost" });

    const handleCreateClub = async (data) => {
        try {
            console.log(data);

            const selectedClubData = clubs.find(c => c.clubName === data.clubName);
        if (!selectedClubData) {
            Swal.fire('Error', 'Please select a valid club!', 'error');
            return;
        }

            const eventImg = data.eventImage[0];
            const formData = new FormData();
            formData.append('image', eventImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            const eventInfo = {
                eventName: data.eventName,
                clubName: data.clubName,
                clubId: selectedClubData._id,
                description: data.eventDescription,
                location: {
                    city: data.city,
                    area: data.area
                },
                eventImage: photoURL,
                membershipFee: data.membershipCost === 'Paid' ? Number(data.amount) : 0,
                status: 'Active',
                managerName: data.managerName,
                managerEmail: data.managerEmail,
                eventDate: new Date(data.eventDate).getTime(),
                createdAt: new Date().getTime()
            };

            const res = await axiosSecure.post('/events', eventInfo);
            console.log('after saving Event', res.data);

            if (res.data.insertedId) {
                navigate('/dashboard/manager/myevents');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Event has been created. Please wait for approval!",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while creating the event!'
            });
        }
    };

    return (
        <div>
            <h2 className="text-5xl font-bold text-primary">Create Events</h2>
            <form onSubmit={handleSubmit(handleCreateClub)} className='mt-12 p-4 text-black'>
                {/* Club info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Event Name</label>
                        <input 
                            type="text" 
                            {...register('eventName', { required: true })} 
                            className="input w-full" 
                            placeholder="Event Name" 
                        />
                        {errors.eventName && <p className='text-red-500 text-sm mt-1'>Event name is required</p>}

                        <label className="label mt-4">Club Name</label>
                        <select 
                            {...register("clubName", { required: true })} 
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Club</option>
                            {clubs.map((item) => (
                                <option key={item._id} value={item.clubName}>
                                    {item.clubName}
                                </option>
                            ))}
                        </select>
                        {errors.clubName && <p className='text-red-500 text-sm mt-1'>Club selection is required</p>}
                    </fieldset>
                </div>

                {/* Two column layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Event Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold text-primary">Event Details</h4>
                        
                        <label className="label">Event Manager</label>
                        <input 
                            type="text" 
                            {...register('managerName')}
                            defaultValue={user?.displayName}
                            className="input w-full" 
                            placeholder="Manager Name" 
                        />

                        <label className="label mt-4">Manager Email</label>
                        <input 
                            type="email" 
                            {...register('managerEmail', { required: true })}
                            defaultValue={user?.email}
                            className="input w-full" 
                            placeholder="Manager Email" 
                        />
                        {errors.managerEmail && <p className='text-red-500 text-sm mt-1'>Email is required</p>}

                        <label className="label mt-4">Event Description</label>
                        <textarea 
                            {...register('eventDescription', { required: true })} 
                            className="textarea textarea-bordered w-full h-32" 
                            placeholder="Write event description here"
                        />
                        {errors.eventDescription && <p className='text-red-500 text-sm mt-1'>Description is required</p>}
                    </fieldset>

                    {/* Location & Other Details */}
                    <fieldset className="fieldset">
                        <label className="label">Location City</label>
                        <select 
                            {...register("city", { required: true })} 
                            className="select select-bordered w-full"
                            disabled={clubCity.length === 0}
                        >
                            <option value="">{clubCity.length > 0 ? 'Loading...' : 'Select Club First'}</option>
                            {clubCity.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        {errors.city && <p className='text-red-500 text-sm mt-1'>City is required</p>}

                        <label className="label mt-4">Area Name</label>
                        <select 
                            {...register("area", { required: true })} 
                            className="select select-bordered w-full"
                            disabled={cityAreas.length === 0}
                        >
                            <option value="">{cityAreas.length > 0 ? 'Select Area' : 'Select City First'}</option>
                            {cityAreas.map((area, index) => (
                                <option key={index} value={area}>
                                    {area}
                                </option>
                            ))}
                        </select>
                        {errors.area && <p className='text-red-500 text-sm mt-1'>Area is required</p>}


<lable className="label mt-4">Event Date</lable><input 
                            type="date" 
                            {...register('eventDate', { required: true })} 
                            className="file-input file-input-bordered w-full" 
                        />
                        {errors.eventDate && <p className='text-red-500 text-sm mt-1'>Event Date is required</p>}



                        <label className="label mt-4">Event Banner Image</label>
                        <input 
                            type="file" 
                            {...register('eventImage', { required: true })} 
                            className="file-input file-input-bordered w-full" 
                        />
                        {errors.eventImage && <p className='text-red-500 text-sm mt-1'>Event image is required</p>}

                        <label className="label mt-4">Membership Cost</label>
                        <select {...register("membershipCost", { required: true })} className="select select-bordered w-full">
                            <option value="">Select Cost</option>
                            <option value="Paid">Paid</option>
                            <option value="Free">Free</option>
                        </select>
                        {errors.membershipCost && <p className='text-red-500 text-sm mt-1'>Please select membership cost</p>}

                        {membershipCost === "Paid" && (
                            <>
                                <label className="label mt-4">Enter Amount</label>
                                <input
                                    type="number"
                                    {...register("amount", { required: membershipCost === "Paid" })}
                                    placeholder="Enter membership amount"
                                    className="input input-bordered w-full"
                                    min="0"
                                />
                                {errors.amount && <p className='text-red-500 text-sm mt-1'>Amount is required for paid events</p>}
                            </>
                        )}
                    </fieldset>
                </div>

                <input 
                    type="submit" 
                    className='btn bg-primary text-white hover:bg-base-200 hover:text-black mt-8 w-full md:w-auto' 
                    value="Create Event" 
                />
            </form>
        </div>
    );
};

export default CreateEvents;
