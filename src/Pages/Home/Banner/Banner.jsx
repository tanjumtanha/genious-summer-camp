import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-awesome-slider/dist/styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AwesomeSlider from 'react-awesome-slider';

const Banner = () => {
  const slides = [
    {
      image: 'https://i.ibb.co/ZW162Z8/summer-9.jpg',
      title: 'Join Our Music Summer Camp!',
      message: 'Experience the joy of music and discover your talent.',
      link: '/register',
      linkText: 'Register Now',
    },
    {
      image: 'https://i.ibb.co/1201fyq/summer-6.webp',
      title: 'Learn from Professionals',
      message: 'Get expert guidance and enhance your skills.',
      link: '/instructors',
      linkText: 'Meet Our Instructors',
    },
    {
      image: 'https://i.ibb.co/brs35ML/summer-10.jpg',
      title: 'Perform music on Stage',
      message: 'Showcase your talent and mesmerize the audience.',
      link: '/events',
      linkText: 'View Upcoming Events',
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto mb-4">
      <AwesomeSlider
        className="slider"
        bullets={false}
        style={{ height: 'auto' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slider-item"
            data-aos="fade-up"
            data-aos-duration="800"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="slider-content">
              <h2 className="text-3xl font-bold mb-4 text-violet-700 border-b-4 border-violet-700">
                {slide.title}
              </h2>
              <p className="text-lg mb-6 text-violet-700 border-b-4 border-violet-700">
                {slide.message}
              </p>
              <Link to={slide.link} className="btn btn-primary">
                {slide.linkText}
              </Link>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default Banner;
