"use client";
import React, { useState } from "react";
import UserCard from "./CardComponent";
import SearchFilterBar from "./SearchFilterBar";

const UserGrid = ({ users }) => {
  const [query, setQuery] = useState("");
  const [filterDepartments, setFilterDepartments] = useState([]);
  const [filterRatings, setFilterRatings] = useState([]);

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filtered = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query);

    const matchesDepartment =
      filterDepartments.length === 0 ||
      filterDepartments.includes(user.department);

    const matchesRating =
      filterRatings.length === 0 ||
      filterRatings.map(Number).includes(user.rating);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <SearchFilterBar
        onSearch={handleSearch}
        onDeptChange={setFilterDepartments}
        onRatingChange={setFilterRatings}
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((user, idx) => (
          <UserCard key={idx} user={user} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No matching users.</p>
        )}
      </div>
    </div>
  );
};

export default UserGrid;
