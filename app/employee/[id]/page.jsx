import React from "react";
import UserCard from "@/components/UserDetailCard";

const fetchUserById = async (id) => {
  const res = await fetch(`https://randomuser.me/api/?results=1`);
  const data = await res.json();
  const u = data.results[0];

  return {
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    phone: u.phone,
    address: `${u.location.street.number}, ${u.location.city}, ${u.location.state}`,
    department: ["Engineering", "HR", "Sales", "Marketing"][Math.floor(Math.random() * 4)],
    rating: Math.floor(Math.random() * 5) + 1,
    bio: "This is a mock bio generated for demo purposes.",
    history: Array.from({ length: 4 }, (_, i) => ({
      year: 2020 + i,
      score: Math.floor(Math.random() * 5) + 1,
    })),
  };
};

const Page = async ({ params }) => {
  const user = await fetchUserById(params.id);
  if (!user) return <div className="text-center text-red-500 mt-10">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <UserCard user={user} />
    </div>
  );
};

export default Page;
