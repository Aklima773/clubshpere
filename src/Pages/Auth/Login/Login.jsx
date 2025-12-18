import React from 'react';

import { useForm } from 'react-hook-form';
import Container from '../../../Components/Container/Container';
import useAuth from '../../../CustomHooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
   

  //login uisng react hook form
const {register,handleSubmit,formState: {errors}} =useForm();


// authprovider call 
const { signInUser } = useAuth();

// location state 
    const location = useLocation();

//use navigate call
    const navigate = useNavigate();

    //login function

    const handleLogin = (data) => {
      console.log('form data', data);
      signInUser(data.email, data.password)
          .then(result => {
              console.log(result.user)
              navigate(location?.state || '/')
              toast.success('login successfully')
          })
          .catch(error => {
              console.log(error)
              toast.error('login failed')
          })
  }
   
    return (
        <>
<div className='bg-base-200'>


       
       
    <div className="hero  min-h-screen">

    <div className="card bg-base-100 w-sm lg:w-full mx-auto max-w-xl shrink-0 shadow-2xl mt-10">

    <Container className='my-4'>
  <div className="flex flex-col">

    
    <div className='flex justify-center items-center my-4'>
     
     <h3 className="text-2xl text-center ">Welcome back </h3>
       <div className='ml-2'><span className='text-center text-2xl text-[#f111db]'>Club<span className='text-[#487ce0]'>Sphere !</span></span></div>
     </div>
            <p className='text-center'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input max-w-xl input-bordered lg:w-[500px]" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered max-w-xl  lg:w-[500px]" placeholder="Password" />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters  or longer </p>
                    }


                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary mt-4 hover:bg-base-200 border-0 hover:text-primary">Login</button>
                </fieldset>
                <p>New to <span className='text-center text-[16px] text-[#f111db]'>Club<span className='text-[#487ce0]'>Sphere!</span></span> <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/register">Register </Link> here....</p>
            </form>
           
        </div>
 
  </Container>
  </div>
</div>
       
        </div>
        </>
       
    );
};

export default Login;