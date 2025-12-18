import React from 'react';
import { useForm, useWatch} from 'react-hook-form';
import useAuth from '../../CustomHooks/useAuth';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useCities from '../../CustomHooks/useCities';
import Swal from 'sweetalert2';
import axios from 'axios';
import useClubs from '../../CustomHooks/useClubs';

const CreateEvents = () => {

// call useForm 
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
  
        // formState: { errors } 
    } = useForm();

    const {user} =useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


      

    //   select club 
    const {clubs} = useClubs();
    const { cities} = useCities();

    // watch 

    const selectedClubName = useWatch({control, name: "club" });

    // const selectedCityName = useWatch({control, name: "city" })

    // get selected club data 

  const selectedClubData = clubs.find(c => c.clubName === selectedClubName);

//   get selected cities name 
const clubCity = selectedClubData?.location?.city ? [selectedClubData.location.city] : [];


// get areas of that city 
const selectedCityData = cities.find(c => c.city === clubCity);
const areas = selectedCityData?.areas || [];

    
      
// handle cost 
const membershipCost = useWatch({control, name:"membershipCost"});


// bannaer image 


const handleCreateClub = async (data) => {
    try {
        console.log(data);

        const clubImg = data.clubImage[0];
        const formData = new FormData();
        formData.append('image', clubImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        
        const imgRes = await axios.post(image_API_URL, formData);
        const photoURL = imgRes.data.data.url;

        const clubInfo = {
            clubName: data.clubName,
            description: data.clubDescription,
            location: {
                city: data.city,
                area: data.area
            },
            bannerImage: photoURL,
            membershipFee: data.membershipCost === 'Paid' ? Number(data.amount) : 0,
            status: 'pending',
            managerEmail: data.managerEmail,
            createdAt: new Date()
        };

        const res = await axiosSecure.post('/clubs', clubInfo);
        console.log('after saving club', res.data);

        if (res.data.insertedId) {
            navigate('/dashboard/manager/myClubs');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Club has been created. Please wait for approval!",
                showConfirmButton: false,
                timer: 2500
            });
        }

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while creating the club!'
        });
    }
};

    return (
        <div>
        <h2 className="text-5xl font-bold text-primary">Create Events</h2>
        <form onSubmit={handleSubmit(handleCreateClub)} className='mt-12 p-4 text-black'>
          
            {/* {Club info} */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                <fieldset className="fieldset">
                    <label className="label">Event Name</label>
                    <input type="text" {...register('clubName')} className="input w-full" placeholder="Club Name" />


                    <label className="label mt-4">Club Name</label>
                    <select {...register("club")} className="select select-bordered w-full">
  <option value="">Select City</option>
  {clubs.map((item) => (
    <option key={item._id} value={item.clubName}>
      {item.clubName}
    </option>
  ))}
</select>
                </fieldset>
            </div>

            {/* two column */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* other Details */}

                <fieldset className="fieldset">
                    <h4 className="text-2xl font-semibold text-primary">Details of Club</h4>
                    {/* Creator name */}
                    <label className="label">Club Manager</label>
                    <input type="text" {...register('managerName')}
                        defaultValue={user?.displayName}
                        className="input w-full" placeholder="managerName" />

                    {/* managCreatorer email */}
                    <label className="label">Manager Email</label>
                    <input type="text" {...register('managerEmail')}
                        defaultValue={user?.email}
                        className="input w-full" placeholder="Manager Email" />

                   


                    {/* descriotion */}
                    <label className="label mt-4">Club Description</label>
                    <textarea type="text" {...register('clubDescription')} className="input w-full h-30" placeholder="Write here" />

                {/* status  */}


                    <label className="label">Status</label>
                    <input type="text" {...register('status')} defaultValue={'pending'} className="input w-full" placeholder="status" />
                </fieldset>


     
           

           {/* location  */}
                <fieldset className="fieldset">
                    

                    
                    <label className="label">Location City</label>
                    <select {...register("city")} className="select select-bordered w-full">
              <option value="">Select City</option>
              {clubCity.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>

          
                    <label className="label">Area Name</label>
                    <select {...register("area")} className="select select-bordered w-full mt-4">
  <option value="">Select Area</option>

  {areas.map((area, index) => (
    <option key={index} value={area}>
      {area}
    </option>
  ))}
</select>

         


                    {/* upload image*/}
                    <label className="label mt-4"> Club Banner Image</label>
                    <input type="file" {...register('clubImage')} className="input file-input file-input-bordered w-full" placeholder="Club Image Upload" />
                 {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}


{/* Payment  */}
          <label className="label mt-4"> Membership Cost</label>
                 <select {...register("membershipCost")} className="select select-bordered w-full mt-4">



  <option value="">Select Cost</option>
    <option  value={"Paid"}>Paid</option>
    <option  value={"Free"}>Free</option>
  
</select>

{membershipCost === "Paid" && (
        <>
          <label className="label mt-4">Enter Amount</label>
          <input
            type="number"
            {...register("amount")}
            placeholder="Enter membership amount"
            className="input input-bordered w-full mt-2"
          />
        </>
      )}

                </fieldset>
            </div>
            <input type="submit" className='btn bg-primary text-white hover:bg-base-200 hover:text-black mt-8 text-black' value="Creat Club" />
        </form>
    </div>
    );
};

export default CreateEvents;