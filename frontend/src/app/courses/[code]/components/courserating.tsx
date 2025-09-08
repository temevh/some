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
    <div key={course.code} className="text-center flex flex-col items-center">
      <p className="text-black text-3xl">{course.name}</p>
      <p className="text-black text-xl">{course.school}</p>
      <div className="flex flex-col space-y-2 items-center mt-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">{t("overall-label")}</p>
          <Rating value={course.rating} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">{t("teaching-label")}</p>
          <Rating value={course.teaching} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">{t("workload-label")}</p>
          <Rating value={course.workload} precision={0.1} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">{t("difficulty-label")}</p>
          <Rating value={course.difficulty} precision={0.1} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
