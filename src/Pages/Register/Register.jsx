import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState('');
    const { createUser, updateUserData, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

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
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserData(loggedUser,data.name, data.photoURL)
                    .catch(error => console.log(error))
            })
        reset();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User created successfully.',
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/login');
    };

    return (
        <div>
            <Helmet>
                <title>Music School-Register</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row h-screen mb-4">
                <div className="bg-blue-400 lg:w-1/2">
                    <img className="h-full w-full object-cover" src="https://i.ibb.co/THcb0m4/summer-2.webp" alt="Registration" />
                </div>
                <div className="flex flex-col justify-center items-center p-8 lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Registration</h2>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your name"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Confirm your password"
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) =>
                                        value === document.getElementById('password').value || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="block text-gray-700 text-sm font-bold mb-2">Photo URL</span>
                            </label>
                            <input type="text"  {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className="w-full px-3 py-2 placeholder-gray-300 text-gray-800 focus:outline-none rounded-md border" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:text-blue-600">
                            Login
                        </Link>
                    </p>
                    <div className="mt-4">
                        <p className="text-sm mb-2">Or register with:</p>
                        <button className="btn btn-outline btn-primary hover:bg-blue-400 text-white py-2 px-4 rounded-md" onClick={handelGoogleSignIn}><FaGoogle className='me-2 text-danger'></FaGoogle>Google</button>
                    </div>
                    <p className='text-red-600'>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
