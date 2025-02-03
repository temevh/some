import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const AddCourseButton = ({
  addCourseClicked,
}: {
  addCourseClicked: () => void;
}) => {
  return (
    <div className="">
      <Button onClick={addCourseClicked}>
        <Plus /> Lisää kurssi
      </Button>
    </div>
  );
};

export default AddCourseButton;
