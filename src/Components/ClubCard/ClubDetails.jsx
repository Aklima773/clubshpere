
import React from 'react';
import { useParams } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import useClubs from '../../CustomHooks/useClubs'
import Container from '../Container/Container';


const ClubDetails = () => {

    const {id} = useParams();
    console.log(id);

    const {clubs} = useClubs();

    const club = clubs.find(c=>c._id === id)

    if(!club) return <Loading/>


    return (
        <div>
          
            <div className="hero mt-10 max-w-300 mx-auto">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={club.bannerImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">{club.clubName}</h1>
      <p className="py-6">
       {club.description}
      </p>

<div className='flex justify-between items-center gap-10'>
<div>
<span className='text-amber-400'>Location: {club.location.city},{club.location.area}</span>
</div>

<div>
<span className='text-primary'>Memeber Ship: {club.membershipFee === 0? "Free" : club.membershipFee}</span>
</div>

</div>
      
      <br/>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>


</div>

<Container>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-10">
          Avaialable Events
        </h1>
      </Container>
        </div>
    );
};

export default ClubDetails;