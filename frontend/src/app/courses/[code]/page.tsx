"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CourseInfo } from "./components";
import { Course } from "./interfaces";

const CoursePage = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      if (!params?.code) return;
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/course/",
          {
            params: { code: params.code },
          }
        );
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseInfo();
  }, [params?.code]);

  if (loading) {
    return <p className="text-black">Ladataan...</p>;
  }

  if (!course) {
    return <p className="text-black">Kurssia ei löytynyt</p>;
  }

  return (
    <div>
      <CourseInfo course={course} />
    </div>
  );
};

export default CoursePage;
