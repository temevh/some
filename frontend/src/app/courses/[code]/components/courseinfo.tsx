import { Course } from "../interfaces";
import { FC } from "react";

import { Card } from "@/app/components/ui/card";

interface CourseInfoProps {
  course: Course;
}

const CourseInfo: FC<CourseInfoProps> = ({ course }) => {
  return (
    <div key={course.code}>
      <p className="text-black text-3xl">{course.name}</p>
      <p className="text-black text-xl">{course.school}</p>
      <p className="text-black text-xl">Yleinen arvosana: {course.rating}</p>
      <p className="text-black text-xl">Opetus: {course.teaching}</p>
      <p className="text-black text-xl">Vaikeus: {course.difficulty}</p>
      <p className="text-black text-xl">Työmäärä: {course.workload}</p>
      <p className="text-black text-xl">Kommentit</p>
      {course.comments.map((comment) => {
        return (
          <Card>
            <p key={comment.id}>{comment.content}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseInfo;
