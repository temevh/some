"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CourseRating, AddRating, CourseComments } from "./components";
import { Course } from "./interfaces";
import { Button } from "@/app/components/ui/button";
import { useMobile } from "@/context/mobilecontext";

import { Card } from "@/app/components/ui/card";

const CoursePage = () => {
  const isMobile = useMobile();
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

  const sendRatingClicked = async (ratings: Rating[], comment?: string) => {
    const courseCode = course?.code;
    console.log("comment:", comment);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/rate",
        { courseCode, ratings, comment }
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

  if (isMobile) {
    return (
      <Card className="w-full bg-bw rounded-lg p-4 text-center gap-4 flex flex-col relative">
        <CourseRating course={course} />
        <CourseComments comments={course.comments} />
        <Button onClick={addClicked}>Lisää arvostelu</Button>
        {addRatingShow && (
          <AddRating
            setAddRatingShow={setAddRatingShow}
            course={course}
            sendRatingClicked={sendRatingClicked}
          />
        )}
      </Card>
    );
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
          sendRatingClicked={sendRatingClicked}
        />
      )}
    </Card>
  );
};

export default CoursePage;
