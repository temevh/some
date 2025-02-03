import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
          <TableRow key={course.id}>
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
