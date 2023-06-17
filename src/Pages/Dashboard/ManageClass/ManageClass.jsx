import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageClass = () => {
    const [classes, setClasses] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axiosSecure.get('/allClass');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleApprove = async (classId) => {
        try {
            const response = await axiosSecure.patch(`/allClass/approve/${classId}`, { status: 'approved' });
            if (response.data.modifiedCount) {
                fetchClasses();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Approved',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error approving class:', error);
        }
    };

    const handleDeny = (classId) => {
        setClasses((prevClasses) => {
            return prevClasses.map((musicClass) => {
                if (musicClass._id === classId) {
                    return { ...musicClass, status: 'denied' };
                }
                return musicClass;
            });
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Denied',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const handleSendFeedback = async (classId) => {
        const feedback = prompt('Enter feedback for the instructor:');
        if (feedback) {
            try {
                await axiosSecure.post('/sendFeedback', { classId, feedback });
                fetchClasses();
            } catch (error) {
                console.error('Error sending feedback:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>

            <table className="min-w-full bg-violet-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4">Class Image</th>
                        <th className="py-2 px-4">Class Name</th>
                        <th className="py-2 px-4">Instructor Name</th>
                        <th className="py-2 px-4">Instructor Email</th>
                        <th className="py-2 px-4">Available Seats</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((musicClass) => (
                        <tr key={musicClass._id} className="border-b">
                            <td className="py-2 px-4">
                                <img
                                    src={musicClass.image}
                                    alt={musicClass.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </td>
                            <td className="py-2 px-4">{musicClass.name}</td>
                            <td className="py-2 px-4">{musicClass.instructor}</td>
                            <td className="py-2 px-4">{musicClass.instructorEmail}</td>
                            <td className="py-2 px-4">{musicClass.availableSeats}</td>
                            <td className="py-2 px-4">{musicClass.price}</td>
                            <td className="text-center">
                                {musicClass.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleApprove(musicClass._id)}
                                            className="btn btn-outline btn-primary"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleDeny(musicClass._id)}
                                            className="btn btn-outline btn-primary ml-2"
                                        >
                                            Deny
                                        </button>
                                    </>
                                ) : (
                                    'Done'
                                )}
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleSendFeedback(musicClass._id)}
                                    className="btn btn-tertiary ml-2"
                                >
                                    Send Feedback
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClass;
