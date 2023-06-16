import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserCheck, FaUserEdit, FaUserShield } from 'react-icons/fa';

const AllUsers = () => {
    const {data: users = [],refetch} = useQuery(['users'], async()=>{
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })
    return (
        <section>
            <Helmet>
                <title>Music School - All User</title>
            </Helmet>
            <h2 className='text-center text-4xl text-blue-600'>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Role</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th className='text-center'>{index + 1}</th>
                                <td className='text-center'>{user.name}</td>
                                <td className='text-center'>{user.email}</td>
                                <td className='text-center'>{ user.role === 'admin' ? 'admin' :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline btn-primary"><FaUserEdit></FaUserEdit></button> 
                                    }
                                    {
                                      user.role === 'instructor' ? 'instructor' :
                                      <button onClick={() => handleMakeInstructor(user)} className="btn btn-outline btn-primary ml-2"><FaUserCheck></FaUserCheck></button>   
                                    }
                                    </td>
                                <td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-violet-400 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsers;