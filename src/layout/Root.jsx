import React from 'react';
import Navbar from '../componants/Navbar';
import { Outlet } from 'react-router';
import Footer from '../componants/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;