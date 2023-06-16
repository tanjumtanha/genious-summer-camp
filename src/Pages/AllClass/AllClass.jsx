import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Title from '../../components/Title/Title';
import classNames from 'classnames';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const AllClass = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

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

    const handelAddClass = item => {
        console.log(item)
        if (user && user.email) {
            const { _id, name, image, instructor, price } = item; // Destructure the item object to access the image property
            const cartItem = { classId: _id, name, image, instructor, price, email: user.email }
            fetch('http://localhost:5000/selectedClass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        //refetch(); // refetch cart to update the number of items in the cart
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You have taken the class successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    }
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
