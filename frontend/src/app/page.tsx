"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { SchoolDropdown } from "./components/filters";
import { Coursetable } from "./components";
import { Input } from "./components/ui";
import { FindCourseButton, AddCourseButton } from "./components/buttons";
import { AddCourseModal } from "./components/modals";

export default function Home() {
  const [courses, setCourses] = useState<
    { id: string; code: string; name: string }[]
  >([]);
  const [school, setSchool] = useState<string | null>(null);
  const [addNewOpen, setAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchCoursesInitial = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/courses/initial"
        );
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCoursesInitial();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/courses/filtered",
        {
          params: { school: school },
        }
      );
      setCourses(response.data);
    } catch (err) {
      console.log("Error fetching courses:", err);
    }
  };
  const addCourseClicked = () => {
    console.log("aaa");
    setAddNewOpen(true);
  };

  return (
    <div className="w-full bg-white p-4 flex flex-col gap-4">
      <div className="flex flex-row gap-6">
        <SchoolDropdown selectedSchool={school} setSchool={setSchool} />
        <Input className="w-[200px]" type="text" placeholder="Kurssi" />
        <FindCourseButton fetchCourses={fetchCourses} />
        <AddCourseButton addCourseClicked={addCourseClicked} />
      </div>
      {addNewOpen && <AddCourseModal />}
      {courses.length ? <Coursetable courses={courses} /> : <p>Ei kursseja</p>}
    </div>
  );
}
