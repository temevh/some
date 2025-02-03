import { Search } from "lucide-react";
import { Button } from "../ui/button";

const FindCourseButton = ({ fetchCourses }) => {
  return (
    <Button onClick={fetchCourses}>
      <Search /> Hae
    </Button>
  );
};

export default FindCourseButton;
