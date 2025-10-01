"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CourseRating, AddRating, CourseComments } from "./components";
import { Course } from "./interfaces";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

import { getCourseInfo, sendCourseRating } from "@/lib/api";

const CoursePage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [addRatingShow, setAddRatingShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCourseInfo = useCallback(async () => {
    const code = Array.isArray(params?.code) ? params.code[0] : params?.code;
    if (!code) return;
    setLoading(true);
    const data = await getCourseInfo(code);
    setCourse(data);
    setLoading(false);
  }, [params, getCourseInfo]);

  useEffect(() => {
    fetchCourseInfo();
  }, [fetchCourseInfo]);

  const checkRatings = (ratings: Record<string, number>) => {
    return Object.values(ratings).every((v) => v >= 1 && v <= 5);
  };

  const sendRatingClicked = async (
    ratings: {
      rating: number;
      teaching: number;
      difficulty: number;
      workload: number;
    },
    comment?: string,
    fakeout?: string,
    recaptchaToken?: string
  ) => {
    if (!course) return;
    if (fakeout) return;

    const isValid = checkRatings(ratings);

    if (!isValid) {
      setErrorMessage(t("required-fields"));
      return;
    } else {
      setErrorMessage("");
    }

    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA.");
      return;
    }

    const response = await sendCourseRating(
      course.code,
      ratings,
      comment,
      recaptchaToken
    );
    console.log(response);

    if (
      response &&
      typeof response === "object" &&
      "message" in response &&
      response.message === "Arvostelu lisätty onnistuneesti!"
    ) {
      fetchCourseInfo();
      setAddRatingShow(false);
      toast({
        variant: "success",
        title: t("toast-add-review-success-title"),
      });
    } else if (
      response &&
      typeof response === "object" &&
      "message" in response
    ) {
      toast({
        variant: "destructive",
        title: t("toast-add-review-error-title"),
        description: response.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: t("toast-add-review-error-title"),
        description: t("toast-add-unknown-description"),
      });
    }
  };
  const addClicked = () => setAddRatingShow(!addRatingShow);

  if (loading)
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center gap-6 flex flex-col relative shadow-sm border animate-pulse">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 md:h-9 w-48 md:w-72 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-w-xl">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-center gap-2">
                <div className="h-5 w-28 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {[...Array(3)].map((_, col) => (
            <div key={col} className="flex flex-col gap-2">
              {[...Array(3)].map((__, row) => (
                <div key={row} className="bg-gray-100 h-20 rounded" />
              ))}
              <div className="h-5 w-24 bg-gray-200 rounded self-center mt-1" />
            </div>
          ))}
        </div>
        <div className="pt-2">
          <div className="h-10 w-44 bg-gray-200 rounded mx-auto" />
        </div>
      </Card>
    );
  if (!course) return <p className="text-black">Kurssia ei löytynyt</p>;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-50 to-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center gap-6 flex flex-col relative shadow-sm border border-blue-100">
      <CourseRating course={course} />
      <div className="border-t border-gray-200" />
      <CourseComments comments={course.comments} courseCode={course.code} />
      <div className="pt-2">
        <Button onClick={addClicked} className="min-w-[180px]">
          {t("add-rating")}
        </Button>
      </div>
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
