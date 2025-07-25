import UserGrid from "./components/UserGrid";

const departments = ["Engineering", "Marketing", "Design", "Sales", "HR"];
const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
const getRandomDepartment = () =>
  departments[Math.floor(Math.random() * departments.length)];

async function getUsers(count = 20) {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data.results.map((u) => ({
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    age: u.dob.age,
    department: getRandomDepartment(),
    rating: getRandomRating(),
  }));
}

export default async function Home() {
  const users = await getUsers(20);
  return <UserGrid users={users} />;
}
