import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title/Title';
import { useTransition, animated } from '@react-spring/web';

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch('https://genious-summer-camp-server.vercel.app/topInstructor')
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      })
      .catch((error) => {
        console.error('Error fetching instructors:', error);
      });
  }, []);

  const transitions = useTransition(instructors, {
    key: (item) => item._id,
    from: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(50%, 0, 0)' },
  });

  return (
    <section>
      <Title heading="Our Popular Instructors" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {transitions((style, item) => (
          <animated.div style={style} key={item._id} className="p-2 w-full sm:w-auto">
            <div className="bg-white rounded-lg shadow-md p-4">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <p className="text-lg font-semibold text-center">Name: {item.name}</p>
              <p className="text-sm text-center text-gray-600 mb-2">Email: {item.email}</p>
            </div>
          </animated.div>
        ))}
      </div>
    </section>
  );
};

export default PopularInstructor;
