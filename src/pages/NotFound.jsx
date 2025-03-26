
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FA]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-[#1A1A1A] mb-6">Oops! Page not found</p>
        <p className="text-[#757575] mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
