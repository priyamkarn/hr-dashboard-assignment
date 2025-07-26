import { AppProvider } from "./contexts/AppProvider";
import AppContent from "./contexts/AppContent";

const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
const getRandomDepartment = () =>
  departments[Math.floor(Math.random() * departments.length)];

async function getUsers(count = 20) {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data.results.map((u, index) => ({
    id: `user-${index}-${Date.now()}`,
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    age: u.dob.age,
    department: getRandomDepartment(),
    rating: getRandomRating(),
    phone: u.phone,
    address: `${u.location.street.number}, ${u.location.city}`,
    bio: "A passionate employee focused on delivering impactful results.",
  }));
}

export default async function Home() {
  const users = await getUsers(20);
  
  return (
    <AppProvider initialUsers={users}>
      <AppContent />
    </AppProvider>
  );
}