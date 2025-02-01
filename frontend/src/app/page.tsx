"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState<{ username: string }[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="w-full bg-white p-4">
      <button
        onClick={fetchUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Users
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <Link href={`/users/${user.username}`} className="text-black">
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
