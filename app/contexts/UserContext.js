"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children, initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [promotions, setPromotions] = useState([]);
  const [projectAssignments, setProjectAssignments] = useState([]);

  const promoteUser = (userId, newPosition) => {
    const promotion = {
      id: Date.now(),
      userId,
      newPosition,
      timestamp: new Date().toISOString(),
    };
    
    setPromotions(prev => [...prev, promotion]);
    console.log(`User ${userId} promoted to ${newPosition}`);
  };

  const assignUserToProject = (userId, projectName) => {
    const assignment = {
      id: Date.now(),
      userId,
      projectName,
      timestamp: new Date().toISOString(),
    };
    
    setProjectAssignments(prev => [...prev, assignment]);
    console.log(`User ${userId} assigned to ${projectName}`);
  };

  const getUserPromotions = (userId) => {
    return promotions.filter(p => p.userId === userId);
  };

  const getUserAssignments = (userId) => {
    return projectAssignments.filter(a => a.userId === userId);
  };

  const value = {
    users,
    setUsers,
    promotions,
    projectAssignments,
    promoteUser,
    assignUserToProject,
    getUserPromotions,
    getUserAssignments
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
