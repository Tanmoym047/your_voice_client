import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";



const UpdateBlogs = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const onSubmitData = (data) => {
        data.email = user.email;
        data.name = user.displayName;
        data._id = _id;
        data.image = user.photoURL;
        data.time = new Date();;
        console.log(data);

        axios.put(`http://localhost:5000/update/${_id}`, data, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            })
        reset();
    }

    const { user } = useContext(AuthContext);
    
    const param = useParams();
    console.log(param.id);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["update", param.id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allBlogs/${param.id}`, { withCredentials: true })
            console.log(res.data);
            return res.data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: onSubmitData,
        onSuccess: () => {
            queryClient.invalidateQueries(["update"])
            Swal.fire({
                title: 'Success!',
                text: 'Blog Updated successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            reset();
            refetch();
            navigate(`/blogs/${param.id}`);
        }
    })

    console.log(data);

    if (isLoading) {
        return <div className="text-center h-screen">
            <span className="loading loading-spinner loading-lg "></span>
        </div>
    }

    const { _id, poster, title, blogImage, short_description, long_description, category, time, name, email, comment } = data;


    return (
        <div className="flex justify-center items-center py-10 bg-base-content rounded-2xl transition-colors duration-300 m-6">
            <title>Your Voice | Update</title>
            <div className="container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-5xl font-bold text-rose-700 animate__animated animate__backInUp">
                        Update Blog - {title}
                    </h1>
                    <p className="mt-4 text-gray-500 font-bold">
                        Edit your blog post details below.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-600 shadow-xl rounded-2xl p-6 md:p-12 transition-colors duration-300">
                    <form onSubmit={handleSubmit(mutateAsync)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blog Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-200">Image URL</span>
                                </label>
                                <input
                                    defaultValue={blogImage}
                                    {...register('blogImage', { required: true })}
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
                                    defaultValue={title}
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
                                    defaultValue={category}
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
                                    defaultValue={poster}
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
                                defaultValue={short_description}
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
                                defaultValue={long_description}
                                {...register('long_description', { required: true })}
                                placeholder="Write the full content of your blog post here"
                                className="textarea textarea-bordered h-24 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                            {errors.long_description && <span className="text-red-500 text-sm mt-1">Long Description is required</span>}
                        </div>

                        {/* Submit button */}
                        <div className="form-control mt-6">
                            <button className="btn bg-rose-800 text-white hover:bg-rose-700 w-full dark:bg-rose-800">
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlogs;