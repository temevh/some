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
    { id: string; code: string; name: string; school: string }[]
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
        setCourses(
          data.map((course: any) => ({
            ...course,
            school: course.school || "Unknown",
          }))
        );
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
    setAddNewOpen(!addNewOpen);
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {addNewOpen && <AddCourseModal />}
      <div className="flex flex-row gap-4">
        <SchoolDropdown selectedSchool={school} setSchool={setSchool} />
        <Input type="text" placeholder="Kurssi" />
        <AddCourseButton addCourseClicked={addCourseClicked} />
      </div>
      <FindCourseButton fetchCourses={fetchCourses} />
      {courses.length ? <Coursetable courses={courses} /> : <p>Ei kursseja</p>}
    </div>
  );
}
