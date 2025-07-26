"use client";
import React from 'react';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border shadow-lg w-80 mx-auto p-4 rounded-lg bg-white animate-pulse">
          {/* Name skeleton */}
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          
          {/* Email skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
          
          {/* Age skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
          
          {/* Department skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>
          
          {/* Rating skeleton */}
          <div className="flex items-center mb-3">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded ml-2 w-12"></div>
          </div>
          
          {/* Buttons skeleton */}
          <div className="flex justify-between space-x-2">
            <div className="h-8 bg-gray-200 rounded-full w-16"></div>
            <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            <div className="h-8 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;