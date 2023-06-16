import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
            <Link to="/" className="text-xl font-semibold text-black">
              Music School
            </Link>
            <p className="mt-4 text-gray-800">
              Providing the best educational experience for young minds to excel in their passions and skills.
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
            <h4 className="text-black font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-800">123 Street, City</p>
            <p className="text-gray-800">Email: info@example.com</p>
            <p className="text-gray-800">Phone: +1 123-456-7890</p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
            <h4 className="text-black font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-800">
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/instructors">Instructors</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes">Classes</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-800" />
        <div className="flex justify-center items-center">
          <p className="text-gray-800 text-center">
            © {new Date().getFullYear()} Music School. All rights reserved.
          </p>
          <div>
            <a href="#" className="text-gray-800 hover:text-black ml-4">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-800 hover:text-black ml-4">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
