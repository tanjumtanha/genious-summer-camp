import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader } from 'react-feather';
import Title from '../../../components/Title/Title';
import { FaTrashAlt } from 'react-icons/fa';
import useClass from '../../../hooks/useClass';
import { AuthContext } from '../../../providers/AuthProvider';

const MyClass = () => {
    const [cart, refetch] = useClass();
    const isLoading = !cart;

    const { user } = useContext(AuthContext);

    // Filter the cart array based on the logged-in instructor's name
    const filteredCart = cart.filter((classItem) => classItem.instructor === user?.displayName);

    const handleFeedback = (classItem) => {
        if (classItem.status === 'denied') {
            return classItem.feedback;
        }
        return 'No feedback yet';
    };

    return (
        <div>
            <Helmet>
                <title>Music School - Selected Class</title>
            </Helmet>
            <Title heading={'Instructor Classes'}></Title>
            <div>
                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader className="animate-spin h-8 w-8 text-gray-500" />
                    </div>
                ) : filteredCart.length === 0 ? (
                    <p>No classes selected.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Enrolled Students
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Feedback
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Update
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCart.map((classItem) => (
                                <tr key={classItem.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{classItem.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{classItem.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{classItem.totalEnrolledStudents || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{handleFeedback(classItem)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button className="text-indigo-600 hover:text-indigo-900">Update</button>
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

export default MyClass;
