import Image from "next/image";
import UserCard from "./components/CardComponent";

export default function Home() {
  const dummyUser = {
    name: "Priyam Karn",
    email: "priyam@example.com",
    age: 24,
    department: "Engineering",
    rating: 4,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UserCard user={dummyUser} />
    </div>
  );
}
