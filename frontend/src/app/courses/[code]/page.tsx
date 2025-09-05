"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CourseRating, AddRating, CourseComments } from "./components";
import { Course } from "./interfaces";
import { Button } from "@/app/components/ui/button";
import { useMobile } from "@/context/mobilecontext";
import { Card } from "@/app/components/ui/card";

import { getCourseInfo, sendCourseRating } from "@/lib/api"; 

const CoursePage = () => {
  const isMobile = useMobile();
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [addRatingShow, setAddRatingShow] = useState(false);
  const [ratingsValid, setRatingsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCourseInfo = async () => {
    if (!params?.code) return;
    setLoading(true);
    const data = await getCourseInfo(params.code);
    setCourse(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseInfo();
  }, [params?.code]);

  const checkRatings = (ratings: Record<string, number>) => {
    return Object.values(ratings).every((v) => v >= 1 && v <= 5);
  };

  const sendRatingClicked = async (
    ratings: { rating: number; teaching: number; difficulty: number; workload: number },
    comment?: string
  ) => {
    if (!course) return;

    const isValid = checkRatings(ratings);
    setRatingsValid(isValid);

    if (!isValid) {
      setErrorMessage("Täytäthän kaikki * merkatut pakolliset kentät!");
      return;
    } else {
      setErrorMessage("");
    }

    const success = await sendCourseRating(course.code, ratings, comment);
    if (success) {
      fetchCourseInfo();
      setAddRatingShow(false);
    }
  };

  const addClicked = () => setAddRatingShow(!addRatingShow);

  if (loading) return <p className="text-black">Ladataan...</p>;
  if (!course) return <p className="text-black">Kurssia ei löytynyt</p>;

  return (
    <Card className="w-full bg-bw rounded-lg p-4 text-center gap-4 flex flex-col relative">
      <CourseRating course={course} />
      <CourseComments comments={course.comments} courseCode={course.code} />
      <Button onClick={addClicked}>Lisää arvostelu</Button>
      {addRatingShow && (
        <AddRating
          setAddRatingShow={setAddRatingShow}
          course={course}
          sendRatingClicked={sendRatingClicked}
          errorMessage={errorMessage}
        />
      )}
    </Card>
  );
};

export default CoursePage;
