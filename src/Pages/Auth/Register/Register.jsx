import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../../Components/Container/Container';
import { useLocation, useNavigate ,Link} from 'react-router';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import useAuth from '../../../CustomHooks/useAuth';
import Logo from '../../../Components/logo/Logo';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
   

    const [showPassword, setShowPassword] = useState(false);
  //use useForm react hook form
const {register,handleSubmit,formState: {errors}} =useForm();

//load auth
const {createUser,updateUserProfile } = useAuth();

// uselocation to catch state 
const location = useLocation();

// navigate 
const navigate = useNavigate();

// axios calling
const axiosSecure = useAxiosSecure(); 

const handlShowPass = (e)=>{
    e.preventDefault();
    
    setShowPassword(!showPassword);
    
    }


const handleRegistration =(data)=>{
    console.log(data);

    // phptpImg to store photo 
    const profileImg = data.photo[0];


    createUser(data.email, data.password)
    .then(()=>{
         // 1. store the image in form data
         const formData = new FormData();
         formData.append('image', profileImg);


          // 2. send the photo to store and get the ul
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

          //3. post on axios
          axios.post(image_API_URL, formData)
          .then(res => {
              const photoURL = res.data.data.url;

              // create user in the database
              const userInfo = {
                  email: data.email,
                  displayName: data.name,
                  photoURL: photoURL
              }
              axiosSecure.post('/users', userInfo)
                  .then(res => {
                      if (res.data.insertedId) {
                          console.log('user created in the database');
                      }
                  })


                        // update user profile to firebase
                        const userProfile = {
                          displayName: data.name,
                          photoURL: photoURL
                      }

                      updateUserProfile(userProfile)
                          .then(() => {
                           
                              navigate(location.state || '/');
                          })
                          .catch(error => console.log(error))
                  })
                

    })
    .catch(error=>{
      console.log(error)
    })
}

   
    return (
        <>
        <div className='bg-base-200'>
        <div className="hero  min-h-screen">
     <div className="card bg-base-100 w-sm lg:w-full mx-auto max-w-xl shrink-0 shadow-2xl mt-10">

      <Container className='my-4'>
        <div className='flex justify-center items-center my-4'>
     
        <h3 className="text-2xl text-center ">Welcome to </h3>
          <div className='ml-2'><span className='text-center text-2xl text-[#f111db]'>Club<span className='text-[#487ce0]'>Sphere !</span></span></div>
        </div>
            
            <p className='text-center text-xl text-primary'>Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text"
                        {...register('name', { required: true })}
                        className="input input-bordered lg:w-[500px]"
                        placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    {/* photo image field */}
                    <label className="label">Photo</label>

                    <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered lg:w-[500px]" placeholder="Your Photo" />

                    {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input input-bordered lg:w-[500px]" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}

                    {/* password */}
                    <label className="label">Password</label>

                    <div className='flex justify-center items-center relative'>
                        <div>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input input-bordered lg:w-[500px] relative -ml-5" placeholder="Password" />


                   
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 characters or longer
                        </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500 text-center'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }
                    </div>

<div>
<button onClick={handlShowPass} className='btn btn-xs absolute top-2 right-10'>{showPassword?<FaEye /> : <FaEyeSlash/> }</button>
</div>

</div>
                    <button className="btn btn-primary mt-4 hover:bg-base-200 border-0 hover:text-primary">Register</button>
                </fieldset>
                <p>Already have an account <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/login">Login</Link></p>
            </form>
            </Container>
        </div>
        </div>
        </div>
        </>
       
    );
};

export default Register;