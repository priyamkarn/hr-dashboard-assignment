"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const departmentData = [
  { department: "HR", rating: 4.1 },
  { department: "Engineering", rating: 4.4 },
  { department: "Marketing", rating: 3.8 },
];

const bookmarkTrends = [
  { month: "Jan", bookmarks: 10 },
  { month: "Feb", bookmarks: 18 },
  { month: "Mar", bookmarks: 25 },
  { month: "Apr", bookmarks: 21 },
  { month: "May", bookmarks: 30 },
  { month: "Jun", bookmarks: 24 },
  { month: "Jul", bookmarks: 35 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      
      <div>
        <h1 className="text-2xl font-bold mb-4">Department Ratings</h1>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div>
        <h2 className="text-2xl font-bold mb-4">Bookmark Trends (Last 7 Months)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={bookmarkTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookmarks" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
