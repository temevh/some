import { Course } from "../interfaces";
import { FC } from "react";
import { Rating } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CourseInfoProps {
  course: Course;
}

const CourseRating: FC<CourseInfoProps> = ({ course }) => {
  const { t } = useTranslation();
  return (
    <div
      key={course.code}
      className="text-center flex flex-col items-center gap-2 md:gap-3"
    >
      <h1 className="text-black text-2xl md:text-3xl font-semibold tracking-tight relative">
        {course.name}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-24 bg-blue-300 rounded-full" />
      </h1>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs md:text-sm text-blue-700 border border-blue-200">
          {course.school}
        </span>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs md:text-sm text-indigo-700 border border-indigo-200">
          {course.code}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 items-center mt-4 w-full max-w-xl">
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-black text-base md:text-lg">
            {t("overall-label")}
          </p>
          <Rating value={Number(course.rating)} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-black text-base md:text-lg">
            {t("teaching-label")}
          </p>
          <Rating value={Number(course.teaching)} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-black text-base md:text-lg">
            {t("workload-label")}
          </p>
          <Rating value={Number(course.workload)} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-black text-base md:text-lg">
            {t("difficulty-label")}
          </p>
          <Rating value={Number(course.difficulty)} precision={0.1} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
