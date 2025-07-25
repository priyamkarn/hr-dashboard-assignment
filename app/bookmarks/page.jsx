"use client";
import useBookmarks from "@/app/hooks/useBookmarks";
import BookmarkCard from "@/app/components/BookmarkCard";
import React from "react";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, isLoaded } = useBookmarks();

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
        <p className="text-gray-600">Loading bookmarks...</p>
      </div>
    );
  }

  console.log("Rendering bookmarks page with:", bookmarks.length, "bookmarks");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
      
      {/* Debug info - remove in production */}
      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        Debug: {bookmarks.length} bookmarks found
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-gray-600">No bookmarked employees.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((user, index) => {
            // Better key generation - use id if available, fallback to index
            const key = user.id ? `bookmark-${user.id}` : `bookmark-index-${index}`;
            
            return (
              <BookmarkCard 
                key={key} 
                user={user} 
                onRemove={removeBookmark} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}