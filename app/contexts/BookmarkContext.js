"use client";
import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarkedEmployees");
      if (stored) {
        const parsedBookmarks = JSON.parse(stored);
        console.log("Loaded bookmarks:", parsedBookmarks);
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      setBookmarks([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    if (isLoaded) {
      try {
        console.log("Saving bookmarks:", bookmarks);
        localStorage.setItem("bookmarkedEmployees", JSON.stringify(bookmarks));
      } catch (error) {
        console.error("Error saving bookmarks:", error);
      }
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = (user) => {
    if (!user) {
      console.error("Invalid user object:", user);
      return;
    }

    const userWithId = {
      ...user,
      id: user.id || user.email || `${user.name}-${user.department}`.replace(/\s+/g, '-').toLowerCase()
    };

    setBookmarks((prev) => {
      if (prev.some((u) => u.id === userWithId.id)) {
        console.log("User already bookmarked:", userWithId.id);
        return prev;
      }
      
      const newBookmarks = [...prev, userWithId];
      console.log("Adding bookmark, new total:", newBookmarks.length);
      return newBookmarks;
    });
  };

  const removeBookmark = (id) => {
    if (!id) {
      console.error("Invalid id for removal:", id);
      return;
    }

    setBookmarks((prev) => {
      const filtered = prev.filter((u) => u.id !== id);
      console.log("Removing bookmark, new total:", filtered.length);
      return filtered;
    });
  };

  const isBookmarked = (user) => {
    const idToCheck = typeof user === 'object' ? 
      (user.id || user.email || `${user.name}-${user.department}`.replace(/\s+/g, '-').toLowerCase()) : 
      user;
    
    return bookmarks.some((u) => u.id === idToCheck);
  };

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    isLoaded
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};