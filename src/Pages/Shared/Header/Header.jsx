import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-400 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img
                    className="h-8 w-8 mr-2"
                    src="https://i.ibb.co/7GLXPvK/Screenshot-2023-06-14-184018.png"
                    alt="Logo"
                />
                <Link
                    to="/"
                    className="font-semibold text-2xl tracking-tight transition-colors duration-300 hover:text-yellow-400"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Music School
                    </span>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
                    type="button"
                    onClick={toggleMenu}
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm lg:flex-grow">
                    <Link
                        to="/"
                        className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/instructors"
                        className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                        onClick={toggleMenu}
                    >
                        Instructors
                    </Link>
                    <Link
                        to="/classes"
                        className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
                        onClick={toggleMenu}
                    >
                        Classes
                    </Link>
                    <Link
                        to="/dashboard"
                        className="block mt-4 ml-2 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                        onClick={toggleMenu}
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="mt-4 ml-4 lg:mt-0">
                    {user ? (
                        <div className="flex items-center">
                            {
                                <img className="h-8 w-8 rounded-full object-cover" src={user?.photoURL} alt="Profile" />
                            }
                            <button
                                className="ml-2 bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-2"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
