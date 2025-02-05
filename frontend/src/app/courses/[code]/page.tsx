"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Course {
  code: string;
  name: string;
  school: string;
  lastUpdate: string;
  rating: string;
  teaching: string;
  difficulty: string;
  workload: string;
  comments: string[];
}

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
    return <p className="text-black">Loading...</p>;
  }

  if (!course) {
    return <p className="text-black">Course not found</p>;
  }

  return (
    <div className="w-full bg-white p-4">
      <p className="text-black">{course.name}</p>
      <p className="text-black">School: {course.school}</p>
      <p className="text-black">Rating: {course.rating}</p>
      <p className="text-black">Teaching: {course.teaching}</p>
      <p className="text-black">Difficulty: {course.difficulty}</p>
      <p className="text-black">Workload: {course.workload}</p>
      {course.comments.map((comment) => {
        return <p key={comment}>{comment.content}</p>;
      })}
    </div>
  );
};

export default CoursePage;
