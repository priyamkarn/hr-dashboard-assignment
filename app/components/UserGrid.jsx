"use client";
import React, { useEffect, useCallback } from "react";
import UserCard from "./CardComponent";
import SearchFilterBar from "./SearchFilterBar";
import { useUsers } from "../contexts/UserContext";
import { useFilters } from "../contexts/FilterContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const UserGrid = () => {
  const { users, promoteUser, loadMoreUsers, loading, hasMore } = useUsers();
  const { filterUsers } = useFilters();

  const filteredUsers = filterUsers(users);
  const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
  // Intersection Observer for infinite scroll
  const { elementRef, isIntersecting } = useIntersectionObserver();

  // Load more users when the sentinel is in view
  const handleLoadMore = useCallback(() => {
    if (isIntersecting && !loading && hasMore) {
      loadMoreUsers();
    }
  }, [isIntersecting, loading, hasMore, loadMoreUsers]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Directory</h1>
          <p className="text-gray-600">Showing {filteredUsers.length} of {users.length} employees</p>
        </div>

        <SearchFilterBar />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user, idx) => (
            <UserCard 
              key={user.id || idx} 
              user={user} 
              onPromote={promoteUser}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No matching users found.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Loading more employees...</span>
            </div>
          </div>
        )}

        {/* Intersection Observer Sentinel */}
        {hasMore && !loading && (
          <div 
            ref={elementRef}
            className="h-10 flex items-center justify-center"
          >
            <div className="text-gray-400 text-sm">Scroll for more employees</div>
          </div>
        )}

        {/* End of Results */}
        {!hasMore && users.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">You've reached the end of the employee list.</p>
            <p className="text-gray-400 text-sm mt-1">Total: {users.length} employees loaded</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-500">Total Employees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {departments.length}
              </div>
              <div className="text-sm text-gray-500">Departments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {(users.reduce((sum, user) => sum + user.rating, 0) / users.length || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGrid;