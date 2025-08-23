import { Link, useLocation, useNavigate } from "react-router-dom";
import 'animate.css';
import { FaGoogle, FaGithub, FaEye } from "react-icons/fa";

import Swal from 'sweetalert2'

import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { GithubAuthProvider } from "firebase/auth";

import axios from "axios";

const Login = () => {
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


    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);

    const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext)

    const googleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const data = {
                    email: result.user.email,
                }
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Logged In',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                axios.post('http://localhost:5000/jwt', data, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/')
                        }

                    })
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
    const githubSignIn = () => {
        signInWithGithub()
            .then(result => {
                console.log(result.user);
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Logged In',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
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



    const onSubmit = (data) => {
        const { email, password } = data;
        const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{6,}$/;
        if (pattern.test(password) && email) {
            signIn(email, password)
                .then(result => {
                    console.log(result.user);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Logged In',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    // get access token
                    axios.post('http://localhost:5000/jwt', data, {
                        withCredentials: true
                    })
                        .then(res => {
                            console.log(res.data)
                            if (res.data.success) {
                                navigate(location?.state ? location?.state : '/')
                            }

                        })
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

        }
    }


    return (
        <div className="hero rounded-2xl mb-4">
            <title>Your Voice | Login</title>
            <div className="hero-content flex-col h-full">
                <div className="text-center ">
                    <h1 className="text-2xl lg:text-5xl text-rose-800 font-bold animate__animated animate__backInUp">Login now!</h1>
                    <p className="py-6">Welcome to Your Voice. You log in - you stay in Wonderland and you can see how deep the rabbit hole goes.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            <div >
                                <input {...register('password')} type="password" placeholder="Password" className="input input-bordered w-full" />

                            </div>

                        </div>
                        <div className="form-control mt-6  space-y-4">
                            <button className="btn bg-rose-800 text-white w-full">Login</button>

                        </div>

                    </form>
                    <div className="mx-8 mb-6">
                        <div className="form-control text-center mb-2 text-lg">
                            New here? Please <Link to='/register' className="text-rose-800 underline">Register</Link>
                        </div>
                        <div className="my-2 opacity-70 flex justify-center">
                            OR
                        </div>
                        <div className="flex gap-4">
                            <button onClick={googleSignIn} className="btn bg-rose-800 text-white flex-1"><FaGoogle />Google</button>
                            <button onClick={githubSignIn} className="btn bg-rose-800 text-white flex-1"><FaGithub />Github</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;