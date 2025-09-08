import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const FindCourseButton = ({ fetchCourses }: { fetchCourses: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={fetchCourses}>
      <Search /> {t("search-button")}
    </Button>
  );
};

export default FindCourseButton;
