"use client"
async function fetchUser(id) {
  const res = await fetch(`https://randomuser.me/api/`);
  const data = await res.json();
  const u = data.results[0];

  const departments = ["HR", "Engineering", "Marketing", "Finance"];
  const department = departments[parseInt(id) % departments.length];
  const rating = (parseInt(id) % 5) + 1;

  const user = {
    id,
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    phone: u.phone,
    age: u.dob.age,
    address: `${u.location.street.number}, ${u.location.city}`,
    department,
    rating,
    bio: "A passionate employee focused on delivering impactful results.",
    history: Array.from({ length: 5 }).map((_, i) => ({
      year: 2020 + i,
      score: ((parseInt(id) + i) % 5) + 1,
    })),
    projects: [
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
    ],
  };

  return JSON.parse(JSON.stringify(user));
}

export default async function Page({ params }) {
  const user = await fetchUser(params.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Employee Profile</h1>
     
    </div>
  );
}
