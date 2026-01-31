import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet-async';

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Gyanplanet Institute</title>
        <meta
          name="description"
          content="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        />
      </Helmet>
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
