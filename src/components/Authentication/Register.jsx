import { Link, useNavigate } from "react-router-dom";
import 'animate.css';
import { FaEye } from "react-icons/fa";
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
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const { signUp } = useContext(AuthContext)


    const onSubmit = (data) => {
        const { email, password, name, photo } = data;
        const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{6,}$/;
        if (pattern.test(password) && email && name && photo) {


            signUp(email, password)
                .then(result => {
                    console.log(result.user);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Registered',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    navigate('/')
                })
                .catch(error => {
                    console.error(error.message);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })

        }
        else {
            if (!pattern.test(password)) {

                Swal.fire({
                    title: 'Error!',
                    text: 'Password must be 6 chars, and have minimum 1 Uppercase and Lowercase Letter and special character',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else if (!email) {

                Swal.fire({
                    title: 'Error!',
                    text: 'Please Check the Email Again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else if (!name) {

                Swal.fire({
                    title: 'Error!',
                    text: 'Please Check the name Again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else if (!photo) {

                Swal.fire({
                    title: 'Error!',
                    text: 'Please Check the photo Again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }

        }
    }




    return (

        <div className="hero rounded-2xl mb-4">
            <div className="hero-content flex-col h-full">
                <div className="text-center ">
                    <h1 className="text-2xl lg:text-5xl text-rose-800 font-bold animate__animated animate__backInUp">Register now!</h1>
                    <p className="py-6">Welcome to Your Voice. You create an account - you stay in Wonderland and I show you how deep the rabbit hole goes.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register('name')} type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input {...register('photo')} type="text" placeholder="Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email')} type="email" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="Password" className="input input-bordered w-full" />
                                <button type="button" onClick={showPassword} className="btn btn-ghost absolute right-0"><FaEye /></button>
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-rose-800 text-white">Register</button>
                        </div>
                        <div className="form-control mt-6 text-center">
                            Already have an account? Please <Link to='/login' className="text-rose-800 underline">Login</Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;