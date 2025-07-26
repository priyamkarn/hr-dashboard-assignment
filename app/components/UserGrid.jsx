"use client";
import React from "react";
import UserCard from "./CardComponent";
import SearchFilterBar from "./SearchFilterBar";
import { useUsers } from "../contexts/UserContext";
import { useFilters } from "../contexts/FilterContext";

const UserGrid = () => {
  const { users, promoteUser } = useUsers();
  const { filterUsers } = useFilters();

  const filteredUsers = filterUsers(users);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <SearchFilterBar />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user, idx) => (
          <UserCard 
            key={user.id || idx} 
            user={user} 
            onPromote={promoteUser}
          />
        ))}
        {filteredUsers.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No matching users.</p>
        )}
      </div>
    </div>
  );
};

export default UserGrid;