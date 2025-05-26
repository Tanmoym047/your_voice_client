import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="container mx-auto  font-ubuntu">

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;