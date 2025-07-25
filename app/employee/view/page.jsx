"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const getStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);
const getBadgeColor = (rating) => {
  if (rating >= 4) return "bg-green-500";
  if (rating === 3) return "bg-yellow-500";
  return "bg-red-500";
};

const getPastRatings = () =>
  Array.from({ length: 5 }, () => Math.floor(Math.random() * 5) + 1);

export default function ViewPage() {
  const params = useSearchParams();
  const user = JSON.parse(params.get("user"));

  const performanceHistory = getPastRatings();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1">Email: {user.email}</p>
      <p className="text-gray-600 mb-1">Age: {user.age}</p>
      <p className="text-gray-600 mb-1">Department: {user.department}</p>

      <p className="text-gray-600 mb-1">
        Phone: {user.phone || "9876543210"}
      </p>
      <p className="text-gray-600 mb-1">
        Address: {user.address || "123 Main Street, City, Country"}
      </p>
      <p className="text-gray-600 mb-3">
        Bio: {user.bio || "A dedicated employee with a passion for excellence."}
      </p>

      <div className="mb-4">
        <span className="text-yellow-500 text-xl">{getStars(user.rating)}</span>
        <span
          className={`ml-2 text-white px-2 py-1 text-sm rounded ${getBadgeColor(
            user.rating
          )}`}
        >
          {user.rating} Stars
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-1">Past Performance</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {performanceHistory.map((r, i) => (
            <li key={i}>
              Year {2024 - i}: {getStars(r)} ({r} Stars)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
