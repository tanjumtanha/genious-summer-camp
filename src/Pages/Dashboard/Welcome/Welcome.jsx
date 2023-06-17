import React from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';

const Welcome = () => {
    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-violet-200 p-4">
            <Helmet>Music School - Welcome</Helmet>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 py-24">
                <div
                    className="md:max-w-lg flex-grow md:pr-16 mb-10 md:mb-0"
                    data-aos="fade-right"
                >
                    <img
                        src="https://i.ibb.co/p0ghDqw/musical-melody-symbols-with-many-doodle-kids-cartoon-character-free-vector.jpg"
                        alt="Music School"
                        className="object-cover w-96 h-96 rounded" // Increase width and height
                    />
                </div>
                <div
                    className="md:max-w-lg flex flex-col items-center md:pl-16 md:items-start text-center md:text-left"
                    data-aos="fade-left"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
                        Welcome to Our Music School
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        We offer a wide range of music classes taught by experienced
                        instructors. Whether you're a beginner or an advanced musician, we
                        have the perfect class for you. Join us and unleash your musical
                        potential!
                    </p>
                    <Link
                        to="/classes"
                        className="inline-block bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                        Explore Classes
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
