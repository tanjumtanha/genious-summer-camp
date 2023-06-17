import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserCheck, FaUserEdit, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    });

    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleDelete = async (user) => {
        console.log(user._id);
        try {
            const result = await Swal.fire({
                title: 'Confirmation',
                text: 'Are you sure you want to delete this user?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
            });
    
            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE',
                });
                refetch();
    
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    return (
        <section className='w-full'>
            <Helmet>
                <title>Music School - All User</title>
            </Helmet>
            <h2 className="text-center text-4xl text-blue-600">All Users</h2>
            <div className="overflow-x-auto p-8">
                <table className="table table-zebra w-full bg-violet-200">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th className="text-center">{index + 1}</th>
                                <td className="text-center">{user.name}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">
                                    {user.role === 'admin' ? (
                                        'admin'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-outline btn-primary"
                                        >
                                            <FaUserEdit />
                                        </button>
                                    )}
                                    {user.role === 'instructor' ? (
                                        'instructor'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn btn-outline btn-primary ml-2"
                                        >
                                            <FaUserCheck />
                                        </button>
                                    )}
                                </td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-ghost bg-violet-400 text-white"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsers;
