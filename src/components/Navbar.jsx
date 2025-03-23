import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-600 p-4 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            ReadHive📚
          </div>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/addNewStudent" className="text-white hover:text-gray-200">Add Student</Link>
            <Link to="/setting" className='text-white hover:text-gray-200'>Setting</Link>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;