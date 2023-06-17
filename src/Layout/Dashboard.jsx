import React from 'react';
import { FaHome, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <section className='bg-blue-200 p-4'>
            <Helmet>
                <title>Music School - Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-violet-400 text-blue-700">
                        <h2 className='text-2xl text-red-500 text-center'>Music School Dashboard</h2>
                        {/* Sidebar content here */}

                        <div>
                            {
                                isAdmin ? (
                                    <div>
                                        <li><NavLink to='home'>Welcome</NavLink></li>
                                        <li><NavLink to='manageClasses'>Manage Classes</NavLink></li>
                                        <li><NavLink to='manageUser'>Manage User</NavLink></li>
                                        <div className='divider'></div>
                                        <li><NavLink to='/'> <FaHome></FaHome>Home</NavLink></li>
                                    </div>

                                ) : isInstructor ? (
                                    <div>
                                        <li><NavLink to='home'>Welcome</NavLink></li>
                                        <li><NavLink to='addClass'>Add a Class</NavLink></li>
                                        <li><NavLink to='myClasses'>My Classes</NavLink></li>
                                        <div className='divider'></div>
                                        <li><NavLink to='/'> <FaHome></FaHome>Home</NavLink></li>
                                    </div>
                                ) :
                                    (
                                        <div>
                                            <li><NavLink to='home'>Welcome</NavLink></li>
                                            <li><NavLink to='mySelectedClasses'>My Selected Class</NavLink></li>
                                            <li><NavLink to='enrollClasses'>My Enroll Class</NavLink></li>
                                            <li><NavLink to='paymentHistory'><FaWallet></FaWallet>Payments</NavLink></li>
                                            <div className='divider'></div>
                                            <li><NavLink to='/'> <FaHome></FaHome>Home</NavLink></li>
                                        </div>
                                    )
                            }
                        </div>

                    </ul>

                </div>
            </div>
        </section>

    );
};

export default Dashboard;