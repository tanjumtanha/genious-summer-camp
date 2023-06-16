import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Title from '../../../components/Title/Title';

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        rating: 4,
        review: 'I had an amazing experience at the music summer camp. The instructors were talented and friendly, and I learned a lot.',
        avatar: 'https://i.ibb.co/M9KGR8X/5-summer.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 5,
        review: 'The music summer camp exceeded my expectations. The curriculum was well-structured, and the events were fantastic.',
        avatar: 'https://i.ibb.co/GdBBtSX/3-summer.webp',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        rating: 4,
        review: 'The music summer camp provided a good learning environment. However, I felt that there could have been more variety in the classes.',
        avatar: 'https://i.ibb.co/pvQJCzD/6-summer.png',
    },
];

const Review = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section>
            <Title heading={"Student Reviews"}></Title>
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border border-gray-300 rounded p-6 shadow-md flex flex-col items-center bg-blue-200"
                            data-aos="fade-up"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={review.avatar}
                                        alt={`${review.name}'s profile`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="ml-2 text-xl font-bold">{review.name}</h3>
                            </div>
                            <div className="text-center mb-4">
                                <div className="text-yellow-500">
                                    {Array.from({ length: review.rating }, (_, index) => (
                                        <AiFillStar key={index} className="inline" />
                                    ))}
                                </div>
                                <p className="text-gray-600">Rating: {review.rating}/5</p>
                            </div>
                            <p className="text-gray-600">{review.review}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="" className="btn btn-primary">
                        View All Reviews
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Review;
