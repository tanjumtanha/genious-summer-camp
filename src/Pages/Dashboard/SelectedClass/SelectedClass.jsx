import React from 'react';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import { Loader } from 'react-feather';
import Swal from 'sweetalert2';
import Title from '../../../components/Title/Title';
import { FaTrashAlt } from 'react-icons/fa';

const SelectedClass = () => {
    const [cart, refetch] = useCart();
    const isLoading = !cart;

    const handleDelete = async (classId) => {
        console.log(classId);
        try {
            const result = await Swal.fire({
                title: 'Confirmation',
                text: 'Are you sure you want to delete this class?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
            });
    
            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/selectedClass/${classId}`, {
                    method: 'DELETE',
                });
                refetch();
    
                Swal.fire('Deleted!', 'The class has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };
    

    return (
        <div>
            <Helmet>
                <title>Music School - Selected Class</title>
            </Helmet>
            <Title heading={'My Selected Classes'}></Title>
            <div>
                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader className="animate-spin h-8 w-8 text-gray-500" />
                    </div>
                ) : cart.length === 0 ? (
                    <p>No classes selected.</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-400">#</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Picture</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Class Name</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Instructor</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Price</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Actions</th>
                                <th className="py-2 px-4 border-b-2 border-gray-400">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((classItem,index) => (
                                <tr key={classItem._id}>
                                    <td className='text-center'>{index+1}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.name}
                                            className="rounded-full h-10 w-10"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center border-gray-300">{classItem.name}</td>
                                    <td className="py-2 px-4 border-b text-center border-gray-300">{classItem.instructor}</td>
                                    <td className="py-2 px-4 border-b text-center border-gray-300">{classItem.price}</td>
                                    <td className="py-2 px-4 border-b text-center border-gray-300">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(classItem._id)}
                                        >
                                            <FaTrashAlt className="text-xl" />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="ml-2 btn btn-outline btn-secondary hover:bg-violet-300 text-white py-1 px-2 rounded">
                                            Payment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SelectedClass;
