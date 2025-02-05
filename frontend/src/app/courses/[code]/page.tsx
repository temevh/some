"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Params {
  code: string;
}

export default async function CoursePage({ params }: { params: Params }) {
  const [course, setCourse] = useState();

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/course/", {
          params: { code: params.code },
        });
        setCourse(response.data);
      } catch (err) {
        console.log("Error fetching courses:", err);
      }
    };
    fetchCourseInfo();
  }, []);

  return (
    <div className="w-full bg-white">
      <p className="text-black">{course?.id}</p>
      <p className="text-black">{course?.name}</p>
    </div>
  );
}
