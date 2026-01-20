import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Container from '../../../Components/Container/Container';
import useAuth from '../../../CustomHooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
   
  const {user} = useAuth();

  //login uisng react hook form
const {register,handleSubmit,formState: {errors}} =useForm();


// authprovider call 
const { signInUser , signInWithGoogle} = useAuth();

const [showPassword, setShowPassword] = useState(false);

const location = useLocation();

//use navigate call
    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        const from = location.state?.from || '/';  
        navigate(from, { replace: true });
      }
    }, [user, navigate, location.state]);


const handlShowPass = (e)=>{
    e.preventDefault();
    
    setShowPassword(!showPassword);
    
    }

    const handleGoogleSignin = ()=>{
        signInWithGoogle()
        .then(res=>{
          console.log(res.user)
         
           navigate(location.state || '/')
          toast.success('Login successfully! 🎉', {
                  position: 'top-right',
                  autoClose: 3000,});
                 
                  
      
        })
        .catch(err=>{
          console.log(err)
          toast.error(err.message || 'Login failed 😞', {
                  position: 'top-right',
                } )
         
        })
      }
// location state 
    
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
                    
                 
<div className='flex justify-center items-center relative mb-3'>
            
        <div> <input type={showPassword? 'text' : 'password'} {...register('password', { required: true, minLength: 6 })} className="input max-w-xl input-bordered lg:w-[500px] -ml-6"  name='password' placeholder="Password" />
          {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters  or longer </p>
                    }
            </div> 
         


          {/* //show/hide button  */}
<div>
<button onClick={handlShowPass} className='btn btn-xs absolute top-2 right-10'>{showPassword?<FaEye /> : <FaEyeSlash/> }</button>
</div>
        
          </div>

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary mt-4 hover:bg-base-200 border-0 hover:text-primary">Login</button>

                    <button onClick={handleGoogleSignin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
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