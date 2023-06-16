import React from 'react';
import { FaHome, FaWallet } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Title from '../components/Title/Title';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <section className='bg-blue-200 p-4'>
            <Helmet>
                <title>Music School - Dashboard</title>
            </Helmet>
            <Title heading="Dashboard" />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-violet-200 text-blue-700">
                    <h2 className='text-2xl text-red-500 text-center'>Music School Dashboard</h2>
                        {/* Sidebar content here */}
                        <li><Link to='mySelectedClasses'>My Selected Class</Link></li>
                        <li><Link to='myEnrollClasses'>My Enroll Class</Link></li>
                        <li><Link to='payment'><FaWallet></FaWallet>Payment</Link></li>
                        <div className='divider'></div>
                        <li><Link to='/'> <FaHome></FaHome>Home</Link></li>
                    </ul>

                </div>
            </div>
        </section>

    );
};

export default Dashboard;