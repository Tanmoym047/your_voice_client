import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Comment from './Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'


const BlogDetails = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const signOut = () => {
        logOut()
            .then(() => {
                axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: 'Success!',
                            text: 'Token expired. Please Re-login',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        navigate('/login'); // Redirect to login page
                    })
                    .catch(error => {
                        console.error("Logout from server failed:", error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to log out from the server.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            })
            .catch(error => {
                console.error(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    // const data = useLoaderData();
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

        data.time = new Date();
        console.log(data);

        axios.put(`http://localhost:5000/addcomment/${_id}`, data, { withCredentials: true })
            .then(res => {
                console.log(res.data);

            })
        reset();
    }

    const { user } = useContext(AuthContext);


    const param = useParams();
    console.log(param.id);

const { data, isLoading } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
        try {
            const res = await axios.get(`http://localhost:5000/allBlogs/${param.id}`, {
                withCredentials: true
            });
            return res.data;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                await signOut();
                navigate("/login");
            }
            throw err;
        }
    }
});

    const { mutateAsync } = useMutation({

        mutationFn: onSubmitData,
        onSuccess: () => {
            queryClient.invalidateQueries(["comment"])
            
        }
    })

    console.log(data);

    if (isLoading) {
        return <div className="text-center h-screen">
            <span className="loading loading-spinner loading-lg "></span>
        </div>
    }

    const { _id, title, blogImage, short_description, long_description, category, time, poster, email, comment } = data;


    return (
        <div className="">
            <title>Your Voice</title>

            <div className="flex justify-between flex-col md:items-center lg:flex-row gap-10 lg:gap-20 p-6">
                <img src={blogImage} className=" lg:h-full rounded-lg shadow-2xl lg:w-1/2" />
                <div className="flex-1">

                    <h1 className="text-4xl font-bold font-disp">{title}</h1>

                    <p className="py-4 font-medium text-xl border-b opacity-80">{short_description}..</p>
                    <p className="py-4 opacity-80  font-medium text-xl ">Posted on: {time}</p>
                    <p className="py-4  font-medium text-xl border-b flex justify-end opacity-80">Posted by: {poster}</p>
                    <p className="py-4 font-medium text-lg border-b">{long_description}</p>

                    <div className=" mt-4 mb-4">
                        <p>Category: <span className="text-rose-800 font-bold opacity-80">{category}</span></p>
                        {
                            user.email === email ? <Link to={`/update/${_id}`}> <button className="btn bg-rose-800 text-white w-full mt-4">Update</button> </Link> : <div> </div>
                        }
                    </div>
                </div>

            </div>
            <div className='border-2 border-rose-800 shadow-2xl rounded-2xl p-6 mt-8'>
                {
                    (user.email === email) ? <div> </div> : <div className='text-center space-y-4'>
                        <h2 className='text-2xl'>You can comment here:</h2>
                        <form onSubmit={handleSubmit(mutateAsync)} className='flex items-center justify-center gap-4'>
                            <textarea {...register('comment')} className="textarea textarea-info w-2/4 h-28 text-xl" placeholder="Comment Here..."></textarea>
                            <button className='btn bg-rose-800 text-white'>Post</button>
                        </form>
                    </div>
                }

                <div className='text-center space-y-4 mt-8'>
                    <h2 className='text-2xl'>Top Comments:</h2>
                    {
                        comment?.map(cmnt => <Comment cmnt={cmnt}></Comment>)
                    }
                </div>
            </div>
        </div>

    );
};

export default BlogDetails;