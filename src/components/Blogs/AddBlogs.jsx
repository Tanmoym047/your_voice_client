import { useContext } from 'react';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddBlogs = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const { user } = useContext(AuthContext);

    const onSubmit = (data) => {
        data.email = user.email;
        data.posterImage = user.photoURL;
        data.time = Date();
        console.log(data);

        // fetch('https://access-world-server.vercel.app/tourist', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })

        axios.post('http://localhost:5000/addblogs', data)

            .then(res => {
                console.log('added', res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Blog Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            });
        reset();
    }

    return (
        <div className="hero  rounded-2xl mb-4 ">
            <title>Our Diary | Add Blog</title>

            <div className="hero-content flex-col h-full  w-full">
                <div className="text-center ">
                    <h1 className="text-2xl lg:text-5xl text-rose-800 font-bold animate__animated animate__backInUp">Add Blog</h1>
                    <p className="py-6">Add your own Blog.</p>
                </div>
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-3 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input {...register('blogImage')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input {...register('title')} type="text" placeholder='' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text p-2">Category</span>
                            </label>
                            <select className='border space-y-2 h-32 text-lg p-2' id="cars" name="cars" size="4"  {...register('category')}>
                                <option value="Health & Fitness">Health & Fitness</option>
                                <option value="Travel">Travel</option>
                                <option value="Nutrition">Nutrition</option>
                                <option value="Productivity">Productivity</option>
                                <option value="Mental Health">Mental Health</option>
                                <option value="Finance">Finance</option>
                            </select>
                            {/* <input {...register('country_name')} type="text" placeholder='' className="input input-bordered" /> */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Short
                                    description</span>
                            </label>
                            <input {...register('short_description')} type="text" placeholder='' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input {...register('long_description')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input {...register('poster')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control mt-6  space-y-4">
                            <button className="btn bg-rose-800 text-white">Add</button>

                        </div>

                    </form>


                    

                </div>
            </div>

        </div>
    );
};

export default AddBlogs;