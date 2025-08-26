import { Link, useNavigate } from "react-router-dom";
import 'animate.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const showPassword = () => {
        setShowPass(!showPass);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const { signUp } = useContext(AuthContext);

    const handleRegistrationError = (message) => {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    };

    const onSubmit = (data) => {
        const { email, password, name, photo } = data;
        const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{6,}$/;
        
        if (!name) {
            handleRegistrationError('Please enter your name.');
            return;
        }

        if (!photo) {
            handleRegistrationError('Please provide a photo URL.');
            return;
        }
        
        if (!email) {
            handleRegistrationError('Please enter a valid email address.');
            return;
        }

        if (!pattern.test(password)) {
            handleRegistrationError('Password must be at least 6 characters long and include an uppercase letter, a number, and a special character.');
            return;
        }

        signUp(email, password)
            .then(result => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Registered',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(error => {
                console.error(error.message);
                handleRegistrationError(error.message);
            });
    };

    return (
        <div className="flex items-center justify-center max-h-1/2 bg-base-content p-4 rounded-2xl mt-2">
            <title>Your Voice | Register</title>
            <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 animate__animated animate__zoomIn">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 animate__animated animate__fadeInDown">Create Your Account</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-800 to-rose-500 font-bold">Your Voice</span>. Join us to start exploring.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input {...register('name')} type="text" placeholder="Your Name" className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                        <input {...register('photo')} type="text" placeholder="https://example.com/photo.jpg" className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input {...register('email')} type="email" placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative mt-1">
                            <input
                                {...register('password')}
                                type={showPass ? 'text' : 'password'}
                                placeholder="Password"
                                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            <button
                                type="button"
                                onClick={showPassword}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? <Link to='/login' className="text-rose-800 font-semibold hover:text-rose-700 transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;