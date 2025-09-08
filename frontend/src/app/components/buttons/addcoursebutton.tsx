import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const AddCourseButton = ({
  addCourseClicked,
}: {
  addCourseClicked: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="">
      <Button onClick={addCourseClicked}>
        <Plus /> {t("add-course")}
      </Button>
    </div>
  );
};

export default AddCourseButton;
