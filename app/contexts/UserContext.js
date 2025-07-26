"use client";
import { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
const getRandomDepartment = () =>
  departments[Math.floor(Math.random() * departments.length)];

const generateUsers = async (count = 20, offset = 0) => {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}&seed=employee-app&page=${Math.floor(offset / count) + 1}`, {
      cache: "no-store",
    });
    const data = await res.json();

    return data.results.map((u, index) => ({
      id: `user-${offset + index}-${Date.now()}-${Math.random()}`,
      name: `${u.name.first} ${u.name.last}`,
      email: u.email,
      age: u.dob.age,
      department: getRandomDepartment(),
      rating: getRandomRating(),
      phone: u.phone,
      address: `${u.location.street.number}, ${u.location.city}`,
      bio: "A passionate employee focused on delivering impactful results.",
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const UserProvider = ({ children, initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [promotions, setPromotions] = useState([]);
  const [projectAssignments, setProjectAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreUsers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newUsers = await generateUsers(20, users.length);
      
      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading more users:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, users.length]);

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

  const resetUsers = () => {
    setUsers(initialUsers);
    setPage(1);
    setHasMore(true);
  };

  const value = {
    users,
    setUsers,
    promotions,
    projectAssignments,
    promoteUser,
    assignUserToProject,
    getUserPromotions,
    getUserAssignments,
    loadMoreUsers,
    loading,
    hasMore,
    resetUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

