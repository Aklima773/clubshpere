import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../CustomHooks/useAuth';

const CreateClubs = () => {

    const {user} =useAuth();
// call useForm 
    const {
        register,
        handleSubmit,
  
        // formState: { errors } 
    } = useForm();

    const handleCreateClub = (data)=>{
        console.log(data)
    }
    return (
        <div>
        <h2 className="text-5xl font-bold">Create Club</h2>
        <form onSubmit={handleSubmit(handleCreateClub)} className='mt-12 p-4 text-black'>
          
            {/* {Club info} */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                <fieldset className="fieldset">
                    <label className="label">Club Name</label>
                    <input type="text" {...register('Club Name')} className="input w-full" placeholder="Club Name" />
                </fieldset>
                <fieldset className="fieldset">
                        <legend className="fieldset-legend">Club Category</legend>
                        <select {...register('clubcategory')} defaultValue="Select a category" className="select">
                            <option >Select a Category</option>
                            <option value="photography" >Photograpgy</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                            {/* {
                                regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                            } */}
                        </select>
                    </fieldset>

            </div>

            {/* two column */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* other Details */}

                <fieldset className="fieldset">
                    <h4 className="text-2xl font-semibold">Details of Club</h4>
                    {/* Creator name */}
                    <label className="label">Club Creator</label>
                    <input type="text" {...register('senderName')}
                        defaultValue={user?.displayName}
                        className="input w-full" placeholder="Sender Name" />

                    {/* managCreatorer email */}
                    <label className="label">Club Creator Email</label>
                    <input type="text" {...register('creatorEmail')}
                        defaultValue={user?.email}
                        className="input w-full" placeholder="Creator Email" />

                    {/* sender region */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Sender Regions</legend>
                        <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                            <option disabled={true}>Pick a region</option>
                            {/* {
                                regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                            } */}
                        </select>
                    </fieldset>

                    {/* sender districts */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Sender Districts</legend>
                        <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                            <option disabled={true}>Pick a district</option>
                            {/* {
                                districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                            } */}
                        </select>
                    </fieldset>


                    {/* sender address */}
                    <label className="label mt-4">Sender Address</label>
                    <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />


                </fieldset>
                {/* receiver Details */}
                <fieldset className="fieldset">
                    <h4 className="text-2xl font-semibold">Receiver Details</h4>
                    {/* receiver name */}
                    <label className="label">Receiver Name</label>
                    <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                    {/* receiver email */}
                    <label className="label">Receiver Email</label>
                    <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                    {/* receiver region */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Receiver Regions</legend>
                        <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                            <option disabled={true}>Pick a region</option>
                            {/* {
                                regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                            } */}
                        </select>
                    </fieldset>

                    {/* receiver district */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Receiver District</legend>
                        <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                            <option disabled={true}>Pick a district</option>
                            {/* {
                                districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                            } */}
                        </select>
                    </fieldset>


                    {/* receiver address */}
                    <label className="label mt-4">Receiver Address</label>
                    <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />


                </fieldset>
            </div>
            <input type="submit" className='btn btn-primary mt-8 text-black' value="Send Parcel" />
        </form>
    </div>
    );
};

export default CreateClubs;