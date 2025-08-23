import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateBlogs = () => {
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

        data.time = Date();
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

    const { data, isLoading, refetch } = new useQuery({
        queryKey: ["update"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allBlogs/${param.id}`)
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
            refetch();
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

        <div className="hero  rounded-2xl mb-4 ">
            <title>Our Diary | Update Blogs {_id} </title>
            <div className="hero-content flex-col h-full  w-full">
                <div className="text-center ">
                    <h1 className="text-2xl lg:text-5xl text-blue-700 font-bold animate__animated animate__backInUp">Update Blog - {title}</h1>

                </div>
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(mutateAsync)} className="card-body space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input defaultValue={blogImage} {...register('blogImage')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input defaultValue={title} {...register('title')} type="text" placeholder='' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select defaultValue={category} className='border space-y-2 h-32 text-lg p-2' id="cars" name="cars" size="4"  {...register('category')}>
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
                            <input defaultValue={short_description} {...register('short_description')} type="text" placeholder='' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input defaultValue={long_description} {...register('long_description')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input defaultValue={poster} {...register('poster')} type="text" placeholder='' className="input input-bordered" />
                        </div>

                        <div className="form-control mt-6  space-y-4">
                            <button className="btn bg-blue-700 text-white">Update</button>

                        </div>

                    </form>

                </div>
            </div>

        </div>

    );
};

export default UpdateBlogs;