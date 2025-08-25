// import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";


const FeaturedBlogs = () => {

    const [featureBlogs, setFeatureBlogs] = useState([]);
    useMemo(() => {
        fetch('http://localhost:5000/featured')
            .then(res => res.json())
            .then(data => {
                // data.sort((a, b) => b.long_description.length - a.long_description.length);
                setFeatureBlogs(data);
                
            })
    }, [])

    console.log(featureBlogs);

    const columns = [
       
        {
            name: 'Blog Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Blog Owner',
            selector: row => row.poster
        },
        {
            name: ' Picture',
            selector: row => <img className="w-10 rounded-full" src={row.posterImage} alt="" />
        },
    ];

    return (
            <div className='mt-12 lg:mt-20'>
                <div className='space-y-4 mb-10 text-center'>
                    <h2 className='text-2xl lg:text-4xl font-bold'>Featured Blogs</h2>
                    <p className='text-lg lg:text-2xl'>Here are all the featured blogs that our community have posted</p>
                </div>
                
                <div className="">
                    <DataTable columns={columns} data={featureBlogs}>
                    </DataTable>
                </div>


            </div>

    );
};

export default FeaturedBlogs;

