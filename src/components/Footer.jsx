import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-10 text-white">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Library Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;