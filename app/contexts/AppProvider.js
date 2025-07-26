"use client";
import { BookmarkProvider } from './BookmarkContext';
import { UserProvider } from './UserContext';
import { FilterProvider } from './FilterContext';

export const AppProvider = ({ children, initialUsers = [] }) => {
  return (
    <UserProvider initialUsers={initialUsers}>
      <BookmarkProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </BookmarkProvider>
    </UserProvider>
  );
};