import React from 'react';

const getStars = (rating) => {
  const fullStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return fullStars + emptyStars;
};

const UserCard = ({ user }) => {
  return (
    <div className="border shadow-lg w-80 mx-auto p-4 rounded-lg bg-white">
      <h3 className="font-bold text-lg mb-1">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <p className="text-sm text-gray-600 mb-1">Age: {user.age}</p>
      <p className="text-sm text-gray-600 mb-3">Department: {user.department}</p>

      {/* Rating Bar */}
      <div className="flex items-center mb-3">
        <span className="text-yellow-400 text-lg">{getStars(user.rating)}</span>
        <span className="ml-2 text-sm text-gray-500">({user.rating}.0)</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-2">
        <button className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">View</button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Bookmark</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Promote</button>
      </div>
    </div>
  );
};

export default UserCard;