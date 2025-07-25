"use client";
import React, { useState } from "react";
import Link from "next/link";

const getStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

const BookmarkCard = ({ user, onRemove, onPromote, onAssignToProject }) => {
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleRemove = () => {
    if (onRemove && user.id) {
      onRemove(user.id);
    }
  };

  const handlePromote = () => {
    setShowPromoteModal(true);
  };

  const handleAssignToProject = () => {
    setShowAssignModal(true);
  };

  const confirmPromote = () => {
    if (onPromote && user.id && selectedPosition) {
      onPromote(user.id, selectedPosition);
      setShowPromoteModal(false);
      setSelectedPosition("");
    }
  };

  const confirmAssign = () => {
    if (onAssignToProject && user.id && selectedProject) {
      onAssignToProject(user.id, selectedProject);
      setShowAssignModal(false);
      setSelectedProject("");
    }
  };

  const cancelModal = () => {
    setShowPromoteModal(false);
    setShowAssignModal(false);
    setSelectedPosition("");
    setSelectedProject("");
  };

  // Sample positions and projects - you can pass these as props or fetch from API
  const availablePositions = [
    "Senior Developer",
    "Team Lead",
    "Project Manager",
    "Department Head",
    "Senior Analyst"
  ];

  const availableProjects = [
    "Project Alpha",
    "Project Beta",
    "Project Gamma",
    "Mobile App Development",
    "Data Migration",
    "System Upgrade"
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="border shadow-lg w-full p-4 rounded-lg bg-white">
        <h3 className="font-bold text-lg mb-1">{user.name || 'Unknown'}</h3>
        <p className="text-sm text-gray-600 mb-1">{user.email || 'No email'}</p>
        <p className="text-sm text-gray-600 mb-1">Age: {user.age || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-3">Department: {user.department || 'N/A'}</p>

        {user.rating && (
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 text-lg">{getStars(user.rating)}</span>
            <span className="ml-2 text-sm text-gray-500">({user.rating}.0)</span>
          </div>
        )}

        <div className="flex justify-between space-x-2">
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
            onClick={handleRemove}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
          >
            Remove
          </button>

          <button 
            onClick={handlePromote}
            className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
          >
            Promote
          </button>

          <button 
            onClick={handleAssignToProject}
            className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
          >
            Assign
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

      {/* Assign to Project Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Assign {user.name} to Project</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select a project to assign this employee to:
            </p>
            
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Project</option>
              {availableProjects.map((project) => (
                <option key={project} value={project}>
                  {project}
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
                onClick={confirmAssign}
                disabled={!selectedProject}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Assign to Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkCard;