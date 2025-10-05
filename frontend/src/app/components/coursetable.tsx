import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslation } from "react-i18next";

interface Course {
  id: string;
  code: string;
  name: string;
  school: string;
}

interface CoursetableProps {
  courses: Course[];
}

const Coursetable: React.FC<CoursetableProps> = ({ courses }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">{t("course-code")}</TableHead>
          <TableHead>{t("course-name")}</TableHead>
          <TableHead>{t("course-school")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow
            key={course.code}
            onClick={() => router.push(`/courses/${course.code}`)}
            className="cursor-pointer transition-colors"
          >
            <TableCell className="font-base">{course.code}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.school}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Coursetable;
