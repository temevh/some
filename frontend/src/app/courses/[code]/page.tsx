"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CourseInfo, AddRating } from "./components";
import { Course } from "./interfaces";
import { Button } from "@/app/components/ui/button";

import { Card } from "@/app/components/ui/card";

const CoursePage = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [addRating, setAddRating] = useState(false);

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

  const addClicked = () => {
    setAddRating(!addRating);
  };

  if (loading) {
    return <p className="text-black">Ladataan...</p>;
  }

  if (!course) {
    return <p className="text-black">Kurssia ei löytynyt</p>;
  }

  return (
    <Card className="w-full bg-bw rounded-lg p-4 text-center gap-4 flex flex-col relative">
      <CourseInfo course={course} />
      <Button onClick={addClicked}>Lisää arvostelu</Button>
      {addRating && <AddRating setAddRating={setAddRating} />}
    </Card>
  );
};

export default CoursePage;
