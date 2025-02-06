import { Course } from "../interfaces";
import { FC } from "react";
import { Rating } from "@mui/material";

interface CourseInfoProps {
  course: Course;
}

const CourseRating: FC<CourseInfoProps> = ({ course }) => {
  return (
    <div key={course.code} className="text-center flex flex-col items-center">
      <p className="text-black text-3xl">{course.name}</p>
      <p className="text-black text-xl">{course.school}</p>
      <div className="flex flex-col space-y-2 items-center mt-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">Yleinen arvosana:</p>
          <Rating value={course.rating} precision={0.1} />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">Opetus:</p>
          <Rating value={course.teaching} precision={0.1} />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">Työmäärä:</p>
          <Rating value={course.workload} precision={0.1} />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-black text-xl">Vaikeusaste:</p>
          <Rating value={course.difficulty} precision={0.1} />
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
