"use client";
import React from "react";
import BookmarkCard from "../components/BookmarkCard";
import { useBookmarks } from "../contexts/BookmarkContext";
import { useUsers } from "../contexts/UserContext";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, isLoaded } = useBookmarks();
  const { promoteUser, assignUserToProject } = useUsers();

  if (!isLoaded) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
        <p className="text-gray-600">Loading bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
      
      {bookmarks.length === 0 ? (
        <p className="text-gray-600">No bookmarked employees.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((user, index) => {
            const key = user.id ? `bookmark-${user.id}` : `bookmark-index-${index}`;
            
            return (
              <BookmarkCard 
                key={key} 
                user={user} 
                onRemove={removeBookmark}
                onPromote={promoteUser}
                onAssignToProject={assignUserToProject}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}