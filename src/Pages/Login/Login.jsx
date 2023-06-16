import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [error, setError] = useState('');
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handelGoogleSignIn = () => {
    // googl sign in
    googleSignIn()
      .then(result => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const onSubmit = (data) => {
    // Handle login 
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });

        reset();  //form reset
        navigate(from, { replace: true });
      })
      .catch(error => {
        setError(error.message)
      })
  };

  return (
    <div>
      <Helmet>
        <title>Music School-Login</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row h-screen mb-2">
        <div className="bg-blue-400 lg:w-1/2">
          <img className="h-full w-full object-cover" src="https://i.ibb.co/5kN5Sbn/summer-1.webp" alt="Login" />
        </div>
        <div className="flex flex-col justify-center items-center p-8 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your password"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => {
                    const passwordField = document.getElementById('password');
                    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                  }}
                >
                  <FaEye></FaEye>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </p>
          <div className="mt-4">
            {errors.submit && (
              <p className="text-red-500 text-xs mt-1">{errors.submit.message}</p>
            )}
            <p className="text-sm mb-2">Or login with:</p>
            <button className="btn btn-outline btn-primary hover:bg-blue-400 text-white py-2 px-4 rounded-md" onClick={handelGoogleSignIn}><FaGoogle className='me-2 text-danger'></FaGoogle>Google</button>
          </div>
          <p className='text-red-600'>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
