"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CourseRating, AddRating, CourseComments } from "./components";
import { Course } from "./interfaces";
import { Button } from "@/app/components/ui/button";

import { Card } from "@/app/components/ui/card";

const CoursePage = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [addRatingShow, setAddRatingShow] = useState(false);

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

  useEffect(() => {
    fetchCourseInfo();
  }, [params?.code]);

  const sendRating = async (ratings) => {
    const courseCode = course?.code;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/rate",
        { courseCode, ratings }
      );
      console.log(response.data);
      if (response.status === 200) {
        fetchCourseInfo();
        setAddRatingShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addClicked = () => {
    setAddRatingShow(!addRatingShow);
  };

  if (loading) {
    return <p className="text-black">Ladataan...</p>;
  }

  if (!course) {
    return <p className="text-black">Kurssia ei löytynyt</p>;
  }

  return (
    <Card className="w-full bg-bw rounded-lg p-4 text-center gap-4 flex flex-col relative">
      <CourseRating course={course} />
      <CourseComments comments={course.comments} />
      <Button onClick={addClicked}>Lisää arvostelu</Button>
      {addRatingShow && (
        <AddRating
          setAddRatingShow={setAddRatingShow}
          course={course}
          sendRating={sendRating}
        />
      )}
    </Card>
  );
};

export default CoursePage;
