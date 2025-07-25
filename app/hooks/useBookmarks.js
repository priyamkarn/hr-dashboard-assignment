// app/hooks/useBookmarks.js
import { useEffect, useState } from "react";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarkedEmployees");
      if (stored) {
        const parsedBookmarks = JSON.parse(stored);
        console.log("Loaded bookmarks:", parsedBookmarks); // Debug log
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      setBookmarks([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        console.log("Saving bookmarks:", bookmarks); // Debug log
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

    // Generate an ID if one doesn't exist
    const userWithId = {
      ...user,
      id: user.id || user.email || `${user.name}-${user.department}`.replace(/\s+/g, '-').toLowerCase()
    };

    setBookmarks((prev) => {
      // Check if already bookmarked using the generated/existing ID
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
    // Handle both user objects and IDs
    const idToCheck = typeof user === 'object' ? 
      (user.id || user.email || `${user.name}-${user.department}`.replace(/\s+/g, '-').toLowerCase()) : 
      user;
    
    return bookmarks.some((u) => u.id === idToCheck);
  };

  return { 
    bookmarks, 
    addBookmark, 
    removeBookmark, 
    isBookmarked,
    isLoaded // Export this to show loading state if needed
  };
}