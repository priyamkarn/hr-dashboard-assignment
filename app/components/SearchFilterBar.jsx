"use client";
import React from "react";
import { useFilters } from "../contexts/FilterContext";

const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
const ratings = [1, 2, 3, 4, 5];

const SearchFilterBar = () => {
  const { 
    handleSearch, 
    setFilterDepartments, 
    setFilterRatings,
    clearFilters
  } = useFilters();

  const handleMultiSelect = (e, setter) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setter(selected);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name, email, or department"
        className="w-full sm:w-1/3 px-4 py-2 border rounded-md shadow-sm"
      />

      <select
        multiple
        onChange={(e) => handleMultiSelect(e, setFilterDepartments)}
        className="w-full sm:w-1/4 px-3 py-2 border rounded-md shadow-sm"
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        multiple
        onChange={(e) => handleMultiSelect(e, setFilterRatings)}
        className="w-full sm:w-1/4 px-3 py-2 border rounded-md shadow-sm"
      >
        {ratings.map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <button
        onClick={clearFilters}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilterBar;