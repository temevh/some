import { Search } from "lucide-react";
import { Button } from "../ui/button";

const FindCourseButton = ({ fetchCourses }: { fetchCourses: () => void }) => {
  return (
    <Button onClick={fetchCourses}>
      <Search /> Hae kursseja
    </Button>
  );
};

export default FindCourseButton;
