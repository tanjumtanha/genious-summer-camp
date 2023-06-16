import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Title from '../../components/Title/Title';
import classNames from 'classnames';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../providers/AuthProvider';

const AllClass = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/allClass')
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
                AOS.init();
            })
            .catch((error) => {
                console.error('Error fetching classes:', error);
            });
    }, []);

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
                                    <button className="btn btn-primary">Select Class</button>
                                )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllClass;
