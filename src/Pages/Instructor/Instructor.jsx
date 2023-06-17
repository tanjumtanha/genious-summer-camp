import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import anime from 'animejs';
import { Helmet } from 'react-helmet-async';

const Instructor = () => {
    const [instructors, setInstructors] = useState({});

    useEffect(() => {
        fetch('https://genious-summer-camp-server.vercel.app/allInstructor')
            .then((res) => res.json())
            .then((data) => {
                setInstructors(data);
            })
            .catch((error) => {
                console.error('Error fetching instructors:', error);
            });
    }, []);

    useEffect(() => {
        anime({
            targets: '.instructor-card',
            opacity: [0, 1],
            translateY: ['-1rem', 0],
            delay: anime.stagger(100),
        });
    }, []);

    const animateButton = (event) => {
        anime({
            targets: event.target,
            scale: [1, 1.1],
            duration: 300,
            easing: 'easeInOutQuad',
        });
    };

    return (
        <section className="container mx-auto bg-violet-200 p-4">
            <Helmet>
                <title>Music School-Instructor</title>
            </Helmet>
            <Title heading="Instructors" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.values(instructors).map((instructor) => (
                    <div
                        key={instructor._id}
                        className="border border-gray-300 rounded p-6 shadow-md instructor-card bg-blue-100 relative"
                    >
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{instructor.email}</p>
                        <p className="text-gray-600 mb-4">
                            Number of Classes: {instructor.classesTaken}
                        </p>
                        <div className="text-gray-600 mb-4">
                            Classes Taken:
                            <ul className="list-disc ml-6">
                                {instructor.classNames.map((className, index) => (
                                    <li key={index}>{className}</li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to={`/instructors/${instructor.id}`}
                            className="btn btn-primary absolute bottom-4 right-4"
                            onMouseEnter={animateButton}
                            onMouseLeave={animateButton}
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Instructor;
