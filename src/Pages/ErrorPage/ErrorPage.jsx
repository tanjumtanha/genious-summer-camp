import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <img
        src="https://i.ibb.co/Dzn1M8S/error.gif" 
        alt="Error"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-700 mb-8">
        We apologize, but an error has occurred.
      </p>
      <Link
        to="/"
        className="text-lg text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
