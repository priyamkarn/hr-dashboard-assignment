// components/UserCard.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import useBookmarks from "@/app/hooks/useBookmarks";

const getStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

const UserCard = ({ user, onPromote }) => {
  const { addBookmark, isBookmarked, removeBookmark } = useBookmarks();
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleBookmark = () => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handlePromote = () => {
    setShowPromoteModal(true);
  };

  const confirmPromote = () => {
    if (onPromote && user.id && selectedPosition) {
      onPromote(user.id, selectedPosition);
      setShowPromoteModal(false);
      setSelectedPosition("");
    }
  };

  const cancelModal = () => {
    setShowPromoteModal(false);
    setSelectedPosition("");
  };

  // Sample positions - you can pass these as props or fetch from API
  const availablePositions = [
    "Senior Developer",
    "Team Lead",
    "Project Manager",
    "Department Head",
    "Senior Analyst"
  ];

  return (
    <>
      <div className="border shadow-lg w-80 mx-auto p-4 rounded-lg bg-white">
        <h3 className="font-bold text-lg mb-1">{user.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{user.email}</p>
        <p className="text-sm text-gray-600 mb-1">Age: {user.age}</p>
        <p className="text-sm text-gray-600 mb-3">Department: {user.department}</p>

        <div className="flex items-center mb-3">
          <span className="text-yellow-400 text-lg">{getStars(user.rating)}</span>
          <span className="ml-2 text-sm text-gray-500">({user.rating}.0)</span>
        </div>

        <div className="flex justify-between space-x-2 mb-2">
          <Link
            href={{
              pathname: "/employee/view",
              query: { user: JSON.stringify(user) },
            }}
          >
            <button className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
              View
            </button>
          </Link>

          <button
            onClick={handleBookmark}
            className={`${
              isBookmarked(user.id) ? "bg-red-500" : "bg-yellow-500"
            } text-white px-3 py-1 rounded-full text-sm`}
          >
            {isBookmarked(user.id) ? "Unbookmark" : "Bookmark"}
          </button>

          <button 
            onClick={handlePromote}
            className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
          >
            Promote
          </button>
        </div>
      </div>

      {/* Promote Modal */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Promote {user.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select a new position for this employee:
            </p>
            
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Position</option>
              {availablePositions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmPromote}
                disabled={!selectedPosition}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;