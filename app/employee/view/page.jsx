"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

const getStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);
const getBadgeColor = (rating) => {
  if (rating >= 4) return "bg-green-500";
  if (rating === 3) return "bg-yellow-500";
  return "bg-red-500";
};

const getPastRatings = () =>
  Array.from({ length: 5 }, () => Math.floor(Math.random() * 5) + 1);

const TABS = ["overview", "projects", "feedback"];

export default function ViewPage() {
  const params = useSearchParams();
  const router = useRouter();

  const user = JSON.parse(params.get("user"));
  const tabParam = params.get("tab");

  const [activeTab, setActiveTab] = useState(tabParam || "overview");

  useEffect(() => {
    if (tabParam && TABS.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    router.push(url.toString());
    setActiveTab(tab);
  };

  const performanceHistory = getPastRatings();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <div className="flex space-x-4 border-b mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 px-3 border-b-2 text-sm font-medium ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <p className="text-gray-600 mb-1">Email: {user.email}</p>
          <p className="text-gray-600 mb-1">Age: {user.age}</p>
          <p className="text-gray-600 mb-1">Department: {user.department}</p>
          <p className="text-gray-600 mb-1">Phone: {user.phone || "9876543210"}</p>
          <p className="text-gray-600 mb-1">
            Address: {user.address || "123 Main Street, City, Country"}
          </p>
          <p className="text-gray-600 mb-3">
            Bio: {user.bio || "A dedicated employee with a passion for excellence."}
          </p>
          <div className="mb-4">
            <span className="text-yellow-500 text-xl">
              {getStars(user.rating)}
            </span>
            <span
              className={`ml-2 text-white px-2 py-1 text-sm rounded ${getBadgeColor(
                user.rating
              )}`}
            >
              {user.rating} Stars
            </span>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
            {[
              {
                name: "AI Chatbot Integration",
                status: "In Progress",
                priority: "High",
                completion: 75,
              },
              {
                name: "Employee Portal",
                status: "Completed",
                priority: "Medium",
                completion: 100,
              },
            ].map((proj, idx) => (
              <li key={idx}>
                <strong>{proj.name}</strong> – {proj.status} (
                {proj.completion}% complete) [{proj.priority}]
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "feedback" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Performance History</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {performanceHistory.map((r, i) => (
              <li key={i}>
                Year {2024 - i}: {getStars(r)} ({r} Stars)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
