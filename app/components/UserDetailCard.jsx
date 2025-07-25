"use client";
import React from "react";

const getStars = (rating) =>
  <span className="text-yellow-500 text-lg">
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </span>;

const getBadgeColor = (rating) => {
  if (rating >= 4) return "bg-green-500";
  if (rating >= 2) return "bg-yellow-500";
  return "bg-red-500";
};

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1">Email: {user.email}</p>
      <p className="text-gray-600 mb-1">Phone: {user.phone}</p>
      <p className="text-gray-600 mb-1">Address: {user.address}</p>
      <p className="text-gray-600 mb-4">Bio: {user.bio}</p>

      <div className="flex items-center mb-4">
        {getStars(user.rating)}
        <span className={`ml-2 text-white text-sm px-2 py-1 rounded ${getBadgeColor(user.rating)}`}>
          {user.rating}.0
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2">Performance History</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {user.history.map((entry, i) => (
          <li key={i}>
            {entry.year}: Rating {entry.score}/5
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCard;
