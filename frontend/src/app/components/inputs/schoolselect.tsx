import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { schools } from "@/assets/data";
import { useTranslation } from "react-i18next";

const SchoolSelect = ({
  updateSchool,
}: {
  updateSchool: (value: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Select onValueChange={updateSchool}>
      <SelectTrigger className="">
        <SelectValue placeholder={t("school-select") as string} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {schools.map((school) => {
            return (
              <SelectItem value={school} key={school}>
                {school}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SchoolSelect;
