"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [courses, setCourses] = useState<
    { id: string; code: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/coursesInitial"
        );
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full bg-white p-4">
      <p className="text-black text-2xl">
        Näytetään ({courses.length}) kurssia
      </p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.code}`} className="text-black">
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
