"use client";
import React from "react";

const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
const ratings = [1, 2, 3, 4, 5];

const SearchFilterBar = ({ onSearch, onDeptChange, onRatingChange }) => {
  const handleMultiSelect = (e, setter) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setter(selected);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <input
        type="text"
        onChange={onSearch}
        placeholder="Search by name, email, or department"
        className="w-full sm:w-1/3 px-4 py-2 border rounded-md shadow-sm"
      />

      <select
        multiple
        onChange={(e) => handleMultiSelect(e, onDeptChange)}
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
        onChange={(e) => handleMultiSelect(e, onRatingChange)}
        className="w-full sm:w-1/4 px-3 py-2 border rounded-md shadow-sm"
      >
        {ratings.map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;
