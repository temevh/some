import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Koodi</TableHead>
          <TableHead>Nimi</TableHead>
          <TableHead>Oppilaitos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow
            key={course.code}
            onClick={() => router.push(`/courses/${course.code}`)}
            className="cursor-pointer hover:bg-gray-100 transition-colors"
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
