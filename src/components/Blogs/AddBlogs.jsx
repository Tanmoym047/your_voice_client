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
        <div className="flex justify-center items-center py-10 bg-base-content rounded-2xl transition-colors duration-300 m-6">
            <div className="container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-5xl font-bold text-rose-700  animate__animated animate__backInUp">
                        Add a New Blog
                    </h1>
                    <p className="mt-4 text-white dark:text-gray-500 font-bold">
                        Share your thoughts and experiences with the community.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-600 shadow-xl rounded-2xl p-6 md:p-12 transition-colors duration-300">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blog Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-200">Image URL</span>
                                </label>
                                <input
                                    {...register('blogImage', { required: false })}
                                    type="url"
                                    placeholder="e.g., https://example.com/image.jpg"
                                    className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.blogImage && <span className="text-red-500 text-sm mt-1">Image URL is required</span>}
                            </div>

                            {/* Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-200">Title</span>
                                </label>
                                <input
                                    {...register('title', { required: true })}
                                    type="text"
                                    placeholder="Enter blog title"
                                    className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.title && <span className="text-red-500 text-sm mt-1">Title is required</span>}
                            </div>

                            {/* Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-200">Category</span>
                                </label>
                                <select
                                    {...register('category', { required: true })}
                                    className="select select-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="" className="bg-gray-100 dark:bg-gray-800">Select a category</option>
                                    <option value="Health & Fitness" className="bg-gray-100 dark:bg-gray-800">Health & Fitness</option>
                                    <option value="Gaming" className="bg-gray-100 dark:bg-gray-800">Gaming</option>
                                    <option value="Travel" className="bg-gray-100 dark:bg-gray-800">Travel</option>
                                    <option value="Nutrition" className="bg-gray-100 dark:bg-gray-800">Nutrition</option>
                                    <option value="Productivity" className="bg-gray-100 dark:bg-gray-800">Productivity</option>
                                    <option value="Mental Health" className="bg-gray-100 dark:bg-gray-800">Mental Health</option>
                                    <option value="Finance" className="bg-gray-100 dark:bg-gray-800">Finance</option>
                                </select>
                                {errors.category && <span className="text-red-500 text-sm mt-1">Category is required</span>}
                            </div>

                            {/* User Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-200">Your Name</span>
                                </label>
                                <input
                                    {...register('poster', { required: true })}
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.poster && <span className="text-red-500 text-sm mt-1">Your Name is required</span>}
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-gray-200">Short Description</span>
                            </label>
                            <textarea
                                {...register('short_description', { required: true })}
                                placeholder="A brief summary of your blog post"
                                className="textarea textarea-bordered h-20 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                            {errors.short_description && <span className="text-red-500 text-sm mt-1">Short Description is required</span>}
                        </div>

                        {/* Long Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-gray-200">Long Description</span>
                            </label>
                            <textarea
                                {...register('long_description', { required: true })}
                                placeholder="Write the full content of your blog post here"
                                className="textarea textarea-bordered h-24 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                            {errors.long_description && <span className="text-red-500 text-sm mt-1">Long Description is required</span>}
                        </div>

                        {/* Submit button */}
                        <div className="form-control mt-6">
                            <button className="btn bg-rose-800 text-white hover:bg-rose-900 w-full dark:bg-rose-800 dark:hover:bg-rose-700">
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogs;