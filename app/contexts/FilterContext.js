"use client";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [filterDepartments, setFilterDepartments] = useState([]);
  const [filterRatings, setFilterRatings] = useState([]);

  const handleSearch = (searchQuery) => {
    setQuery(typeof searchQuery === 'string' ? searchQuery.toLowerCase() : '');
  };

  const clearFilters = () => {
    setQuery("");
    setFilterDepartments([]);
    setFilterRatings([]);
  };

  const filterUsers = (users) => {
    return users.filter((user) => {
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
  };

  const value = {
    query,
    filterDepartments,
    filterRatings,
    handleSearch,
    setFilterDepartments,
    setFilterRatings,
    clearFilters,
    filterUsers
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};