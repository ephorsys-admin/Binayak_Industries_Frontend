import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <span className="text-6xl font-black text-[#981b2e] block mb-2 font-brand">404</span>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Page Not Found</h2>
        <p className="text-sm text-stone-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#981b2e] text-white text-sm font-semibold hover:bg-[#801424] transition-all shadow-sm"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;