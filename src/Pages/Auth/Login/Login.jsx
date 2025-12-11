import React from 'react';

import { useForm } from 'react-hook-form';
import Container from '../../../Components/Container/Container';

const Login = () => {
   
const {register,handleSubmit,formState: {errors}} =useForm();

const handleRegister =(data)=>{
    console.log(data)
}

   
    return (
        <>
<div className='bg-base-200'>


        <Container className=''>
       
    <div className="hero  min-h-screen">
  <div className="flex flex-col">
    <div className="text-center my-5">
      <h1 className="text-5xl font-bold text-primary">Login now!</h1>
    
    </div>
    <div className="card w-full bg-base-100  max-w-2xl shrink-0 shadow-2xl">
      <div className="card-body">
        <form  onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" {...register('email')} placeholder="Email" />
          {errors.email && <p>Email is required.</p>}
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary mt-4">Login</button>

          Are You New! please <span className='text-sm text-secondary'>Register!</span>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
        </Container>
        </div>
        </>
       
    );
};

export default Login;