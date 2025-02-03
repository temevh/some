"use client";
import { useEffect, useState } from "react";
import { SchoolDropdown } from "./components/filters";
import { Coursetable } from "./components";
import { Input } from "./components/ui";
import { FindCourseButton } from "./components/buttons";

export default function Home() {
  const [courses, setCourses] = useState<
    { id: string; code: string; name: string }[]
  >([]);
  const [school, setSchool] = useState(null);

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
    <div className="w-full bg-white p-4 flex flex-col gap-4">
      <div className="flex flex-row gap-6">
        <SchoolDropdown setSchool={setSchool} />
        <Input className="w-[200px]" type="text" placeholder="Kurssi" />
        <FindCourseButton />
      </div>
      <Coursetable courses={courses} />
    </div>
  );
}
