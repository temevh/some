import { Search } from "lucide-react";
import { Button } from "../ui/button";

const AddCourseButton = ({ addCourseClicked }) => {
  return (
    <Button onClick={addCourseClicked}>
      <Search /> Lisää kurssi
    </Button>
  );
};

export default AddCourseButton;
