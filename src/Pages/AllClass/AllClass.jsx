import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '../../components/Title/Title';
import classNames from 'classnames';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllClass = () => {
    const [classes, setClasses] = useState([]);
    const [, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get('/allClass')
            .then((response) => {
                const filteredClasses = response.data.filter(
                    (musicClass) => musicClass.status !== 'pending'
                );
                setClasses(filteredClasses);
                AOS.init();
            })
            .catch((error) => {
                console.error('Error fetching classes:', error);
            });
    }, []);

    const handelAddClass = (item) => {
        if (user && user.email) {
            const { _id, name, image, instructor, price } = item;
            const cartItem = {
                classId: _id,
                name,
                image,
                instructor,
                price,
                email: user.email,
            };
            axiosSecure
                .post('/selectedClass', cartItem)
                .then((response) => {
                    if (response.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You have taken the class successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error adding class:', error);
                });
        }
    };
    return (
        <section className="container mx-auto bg-violet-200 p-4">
            <Helmet>
                <title>Music School - Classes</title>
            </Helmet>
            <Title heading="Classes" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((musicClass) => (
                    <div
                        key={musicClass._id}
                        className={classNames(
                            'bg-blue-100 rounded-lg p-4',
                            { 'bg-red-300': musicClass.availableSeats === 0 }
                        )}
                        data-aos="fade-up"
                    >
                        <img
                            src={musicClass.image}
                            alt={musicClass.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-bold mb-2">{musicClass.name}</h2>
                        <h4 className="text-gray-700 font-bold mb-2">
                            Instructor: {musicClass.instructor}
                        </h4>
                        <p className="text-gray-700 mb-2">
                            Available Seats: {musicClass.availableSeats}
                        </p>
                        <p className="text-gray-700 mb-4">Price: {musicClass.price}</p>
                        {!user ? (
                            <p className="text-red-500">
                                Please log in to select this class.
                            </p>
                        )
                            : musicClass.availableSeats === 0 ? (
                                <p className="text-red-500">No available seats.</p>
                            )
                                : (
                                    <button onClick={() => handelAddClass(musicClass)} className="btn btn-primary">Select Class</button>
                                )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllClass;
