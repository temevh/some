"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [courses, setCourses] = useState<
    { id: string; code: string; name: string }[]
  >([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get");
      const data = await response.json();
      setCourses(data);
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
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/users/${course.code}`} className="text-black">
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
